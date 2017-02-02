// TODO : use json-schema-compose
import workspaceSchema from './workspace.schema.json';

const { definitions, properties } = workspaceSchema;

const timebarSchema = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  definitions: {
    boundaries: definitions.boundaries,
    timeBar: definitions.timeBar,
  },
  ...properties.timebars,
};

module.exports = timebarSchema;
