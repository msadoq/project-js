
const VIMA_BASE_VERSION = require('../constants').VIMA_BASE_VERSION;

const ViewConfiguration = require('../models/ViewConfiguration');
const Validator = require('../validators/Validator');

module.exports = (path) => {
  const getVersion = viewConfiguration =>
    viewConfiguration.version || VIMA_BASE_VERSION;

  const toValidate = ViewConfiguration.fromFile(path);
  const version = getVersion(toValidate);
  const validator = new Validator(version);

  const validation = validator.validate(toValidate);

  if (!validation.isValid) {
    process.stderr.write(
      `${path} is NOT a valid ${toValidate.type} configuration file.\n${validation.errors}\n`
    );

    return 1;
  }

  return 0;
};
