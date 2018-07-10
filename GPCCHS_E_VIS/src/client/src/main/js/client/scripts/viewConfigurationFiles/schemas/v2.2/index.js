const definitionSchema = require('./definitions.schema.json');
const PUS11ViewSchema = require('../../../../lib/common/viewConfigurationFiles/schemas/PUS11View.schema.json');
const PUS14ViewSchema = require('../../../../lib/common/viewConfigurationFiles/schemas/PUS14View.schema.json');

module.exports = {
  definitions: definitionSchema,
  PUS11View: PUS11ViewSchema,
  PUS14View: PUS14ViewSchema,
};
