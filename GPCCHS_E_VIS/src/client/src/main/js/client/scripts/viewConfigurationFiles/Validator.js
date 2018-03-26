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
    this.ajv = new Ajv({
      allErrors: true,
      verbose: true,
    });
  }

  validate(viewConfiguration) {
    const validate =
      this.ajv
        .addSchema(getDefinitionSchema(this.version))
        .compile(getViewConfigurationSchema(this.version, viewConfiguration.type));

    return {
      isValid: validate(viewConfiguration),
      errors: this.ajv.errorsText(validate.errors),
    };
  }
}

module.exports = Validator;
