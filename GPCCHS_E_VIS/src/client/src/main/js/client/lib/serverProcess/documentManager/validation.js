// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 21/07/2017 : Move documentManager in serverProcess .
// VERSION : 1.1.2 : DM : #6700 : 03/08/2017 : Merge branch 'dev' into dbrugne-data
// END-HISTORY
// ====================================================================

import Ajv from 'ajv';

import _flow from 'lodash/fp/flow';
import _fpMap from 'lodash/fp/map';
import _fpUniqBy from 'lodash/fp/uniqBy';
import _fpJoin from 'lodash/fp/join';
import _join from 'lodash/join';
import _get from 'lodash/get';
import _isArray from 'lodash/isArray';
import fs from 'fs';
import getLogger from 'common/logManager';

import definitionsSchema from 'common/viewConfigurationFiles/schemas/definitions.schema.json';
import workspaceSchema from 'common/viewConfigurationFiles/schemas/workspace.schema.json';
import pageSchema from 'common/viewConfigurationFiles/schemas/page.schema.json';
import timebarsSchema from 'common/viewConfigurationFiles/schemas/timebars.schema.json';

const logger = getLogger('common:validation');

const ajv = new Ajv({
  allErrors: true,
  verbose: true,
  schemas: [
    definitionsSchema,
    workspaceSchema,
    pageSchema,
    timebarsSchema,
  ],
});

const knownValidators = {
  workspace: ajv.compile(workspaceSchema),
  page: ajv.compile(pageSchema),
  timebars: ajv.compile(timebarsSchema),
};

export function formatError(err) {
  const keys = Object.keys(_get(err, 'params', []));
  const param = keys.length ? err.params[keys[0]] : '';
  return _get(err, 'dataName', '')
    .concat(' ')
    .concat(_get(err, 'message', '')
    .concat(_isArray(param) ? ' : '.concat(_join(param, ', ')) : ''));
}

export function verboseFormatError(err) {
  const keys = Object.keys(_get(err, 'params', []));
  return '\nValidation error: '
    .concat(_get(err, 'dataName', ''))
    .concat(' ')
    .concat(_get(err, 'message', ''))
    .concat(keys.length ? `\nparams: ${JSON.stringify(err.params)}` : '') // any param ?
    .concat(`\ndata: ${JSON.stringify(_get(err, 'data', undefined), null, 2)}`);
}

const VERBOSE = true;

function reformat(errors, verbose) {
  return _flow(
    _fpMap(verbose ? verboseFormatError : formatError),
    _fpUniqBy(m => m),
    _fpJoin('\n')
  )(errors);
}

/**
 * from the error get the associated field value / title so that the error becomes more explicit
 * @param dataPath
 * @param data
 * @returns {*}
 */
function getDataName(dataPath, data) {
  const field = _get(data, dataPath.substr(1)); // removes the '.' starting the dataPath
  if (field instanceof Object) {
    if (field.path) {
      return _get(JSON.parse(fs.readFileSync(field.path)), 'title', dataPath);
    }
    return field.title || dataPath;
  }
  return field || dataPath;
}

const validate = (id, data, schema) => {
  if (!knownValidators[id]) {
    if (!schema) {
      return new Error('Unknown validator');
    }

    knownValidators[id] = ajv.compile(schema);
  }

  if (typeof data !== 'object' || !Object.keys(data).length) {
    return new Error('Empty file');
  }

  if (!knownValidators[id](data)) {
    const enhancedErrors = knownValidators[id].errors.map(e => ({
      ...e,
      dataName: getDataName(e.dataPath, data),
    }));


    logger.error('Validation failed:\n', reformat(enhancedErrors, VERBOSE));

    return new Error(reformat(enhancedErrors));
  }

  return undefined;
};

/**
 * Validate a given file content against corresponding JSON schema
 *
 * validate('myType', myContent);
 * // or ...
 * validate('myType', myContent, mySchema);
 *
 * @param id
 * @param content {Object}
 * @param schema {Object}
 * @returns {Error}
 */
export default (...args) => {
  if (args.length !== 2 && args.length !== 3) {
    return new Error('Error validate(): 2 or 3 arguments expected');
  }
  return validate(...args);
};
