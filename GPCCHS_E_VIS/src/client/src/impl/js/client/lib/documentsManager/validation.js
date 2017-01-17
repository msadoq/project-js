const Ajv = require('ajv');

const pathWorkspace = require('./schemas/workspace.schema.json');
const pathPage = require('./schemas/page.schema.json');
const timebarsSchema = require('./schemas/timebars.schema.js');

const ajv = new Ajv({ allErrors: true });
const knownValidators = {
  workspace: ajv.compile(pathWorkspace),
  page: ajv.compile(pathPage),
  timebars: ajv.compile(timebarsSchema),
};

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
    return knownValidators[id].errors;
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
module.exports = (...args) => {
  if (args.length !== 2 && args.length !== 3) {
    return new Error('Error validate(): 2 or 3 arguments expected');
  }
  return validate(...args);
};
