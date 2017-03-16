import _ from 'lodash/fp';

import {
  DATASTRUCTURETYPE_LAST,
  DATASTRUCTURETYPE_RANGE,
} from 'common/constants';

import composeReducers from '../store/composeReducers';
import createReducerByViews from '../store/createReducerByViews';
import commonConfigurationReducer from './commonConfiguration/reducer';

import dataStructurelast from '../dataManager/structures/last';
import dataStructurerange from '../dataManager/structures/range';

import dynamicViewSchema from './DynamicView/DynamicView.schema.json';
import plotViewSchema from './PlotView/PlotView.schema.json';
import textViewSchema from './TextView/TextView.schema.json';

import dynamicViewModule from './DynamicView';
import plotViewModule from './PlotView';
import textViewModule from './TextView';

import textViewConfigurationReducer from './TextView/store/configurationReducer';

export const VM_VIEW_PLOT = 'PlotView';
export const VM_VIEW_TEXT = 'TextView';
export const VM_VIEW_DYNAMIC = 'DynamicView';

const list = {
  [VM_VIEW_PLOT]: {
    // configurationReducer: _.always({}),
    schema: plotViewSchema,
    viewModule: plotViewModule,
    structureType: DATASTRUCTURETYPE_RANGE,
    structureModule: dataStructurerange,
  },
  [VM_VIEW_TEXT]: {
    configurationReducer: createReducerByViews(
      composeReducers(textViewConfigurationReducer, commonConfigurationReducer),
      VM_VIEW_TEXT
    ),
    schema: textViewSchema,
    viewModule: textViewModule,
    structureType: DATASTRUCTURETYPE_LAST,
    structureModule: dataStructurelast,
  },
  [VM_VIEW_DYNAMIC]: {
    // configurationReducer: _.always({}),
    schema: dynamicViewSchema,
    viewModule: dynamicViewModule,
    structureType: DATASTRUCTURETYPE_LAST,
    structureModule: dataStructurelast,
  },
};

export default list;

export const getAvailableViews = _.always(_.keys(list));

export function isViewTypeSupported(type) {
  return !!list[type];
}

function isViewTypeExists(type) {
  if (!list[type]) {
    // important! throwing helps error detection during development
    throw new Error(`Invalid viewManager call for type ${type}`);
  }
}

export function getSchema(type) {
  isViewTypeExists(type);
  return list[type].schema;
}

export function getViewModule(type) {
  isViewTypeExists(type);
  return list[type].viewModule;
}

export function getStructureType(type) {
  isViewTypeExists(type);

  return list[type].structureType;
}

export function getStructureModule(type) {
  isViewTypeExists(type);

  return list[type].structureModule;
}

// Configuration reducers
const appendString = _.curry((x, str) => str.concat(x));
export const configurationReducers = _.compose(
  _.omitBy(_.isUndefined),
  _.mapKeys(appendString('Configuration')),
  _.mapValues(_.prop('configurationReducer'))
)(list);
