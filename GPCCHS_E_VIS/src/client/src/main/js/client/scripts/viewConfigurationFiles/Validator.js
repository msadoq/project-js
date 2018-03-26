/* eslint-disable import/no-dynamic-require,global-require */

const Ajv = require('ajv');

const getViewConfigurationSchema = (version, type) => {
  const availableSchemas = require(`./schemas/v${version}`);
  return availableSchemas[type];
};

const getDefinitionSchema = (version) => {
  const availableSchemas = require(`./schemas/v${version}`);
  return availableSchemas.definitions;
};

class Validator {
  constructor(version) {
    this.version = version;
  }

  validate(viewConfiguration) {
    const ajv = new Ajv();

    const validate =
      ajv
        .addSchema(getDefinitionSchema(this.version))
        .compile(getViewConfigurationSchema(this.version, viewConfiguration.type));

    return validate(viewConfiguration.content);
  }
}

module.exports = Validator;
