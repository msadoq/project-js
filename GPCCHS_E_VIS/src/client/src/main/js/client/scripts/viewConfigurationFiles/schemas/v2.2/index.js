const definitionSchema = require('./definitions.schema.json');
const PUS11ViewSchema = require('../../../../lib/common/viewConfigurationFiles/schemas/PUS11View.schema.json');

module.exports = {
  definitions: definitionSchema,
  PUS11View: PUS11ViewSchema,
};
