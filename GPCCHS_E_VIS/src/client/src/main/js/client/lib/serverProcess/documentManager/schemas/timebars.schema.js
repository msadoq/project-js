// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 21/07/2017 : Move documentManager in serverProcess .
// VERSION : 1.1.2 : DM : #6700 : 03/08/2017 : Merge branch 'dev' into dbrugne-data
// END-HISTORY
// ====================================================================

// TODO : use json-schema-compose
import workspaceSchema from './workspace.schema.json';

const { definitions, properties } = workspaceSchema;

const timebarSchema = {
  $schema: 'http://json-schema.org/draft-06/schema#',
  definitions: {
    boundaries: definitions.boundaries,
    timeBar: definitions.timeBar,
  },
  ...properties.timebars,
};

module.exports = timebarSchema;
