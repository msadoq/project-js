import schema from './DynamicView.schema.json';

module.exports = {
  structureType: () => 'last',
  getSchemaJson: () => schema,
};
