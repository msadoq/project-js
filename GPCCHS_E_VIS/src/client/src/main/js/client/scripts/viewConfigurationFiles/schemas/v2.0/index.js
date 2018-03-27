
const definitionSchema = require('./definitions.schema.json');
const workspaceSchema = require('./workspace.schema.json');
const pageSchema = require('./page.schema.json');
const plotViewSchema = require('./PlotView.schema.json');
const dynamicViewSchema = require('./DynamicView.schema.json');
const textViewSchema = require('./TextView.schema.json');
const mimicViewSchema = require('./MimicView.schema.json');
const historyViewSchema = require('./HistoryView.schema.json');
const groundAlarmViewSchema = require('./GroundAlarmView.schema.json');
const onBoardAlarmViewSchema = require('./OnboardAlarmView.schema.json');

module.exports = {
  definitions: definitionSchema,
  WorkSpace: workspaceSchema,
  Page: pageSchema,
  PlotView: plotViewSchema,
  DynamicView: dynamicViewSchema,
  TextView: textViewSchema,
  MimicView: mimicViewSchema,
  HistoryView: historyViewSchema,
  GroundAlarmView: groundAlarmViewSchema,
  OnboardAlarmView: onBoardAlarmViewSchema,
};
