const Ajv = require('ajv');

const ajv = new Ajv({ allErrors: true });
const knownValidators = {
  workspace: ajv.compile(('./schemas/workspace.schema.json')),
  page: ajv.compile(('./schemas/page.schema.json')),
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
 * validate('myType', mySchema, myContent);
 *
 * @param id
 * @param schema {Object}
 * @param content {Object}
 * @returns {Error}
 */
module.exports = (...args) => {
  let id;
  let data;
  let schema;
  if (args.length === 2) {
    id = args[0];
    data = args[1];
  } else if (args.length === 3) {
    id = args[0];
    data = args[1];
    schema = args[2];
  } else {
    return new Error('Error validate(): 2 or 3 arguments expected');
  }

  return validate(id, data, schema);
};
