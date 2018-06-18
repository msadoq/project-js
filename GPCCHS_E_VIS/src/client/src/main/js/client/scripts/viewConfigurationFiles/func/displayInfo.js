
const ViewConfiguration = require('../models/ViewConfiguration');

module.exports = (path) => {
  const { version, type } = ViewConfiguration.fromFile(path).info;
  process.stdout.write(
    `The file '${path}' is a ${type} configuration file for VIMA ${version}\n`
  );
};
