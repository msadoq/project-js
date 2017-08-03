import Ajv from 'ajv';

import _map from 'lodash/map';
import _join from 'lodash/join';
import _isArray from 'lodash/isArray';
import pathWorkspace from './schemas/workspace.schema.json';
import pathPage from './schemas/page.schema.json';
import timebarsSchema from './schemas/timebars.schema';

const ajv = new Ajv({ allErrors: true });
const knownValidators = {
  workspace: ajv.compile(pathWorkspace),
  page: ajv.compile(pathPage),
  timebars: ajv.compile(timebarsSchema),
};

function reformat(errors) {
  return _map(errors, (err) => {
    const keys = Object.keys(err.params);
    const param = keys.length ? err.params[keys[0]] : '';
    return err.dataPath.concat(' ')
      .concat(err.message.concat((_isArray(param) ? ' : '.concat(_join(param, ', ')) : '')));
  }).join('\n');
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
    return new Error(reformat(knownValidators[id].errors));
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
