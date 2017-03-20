import _ from 'lodash/fp';

import {
  DATASTRUCTURETYPE_LAST,
  DATASTRUCTURETYPE_RANGE,
} from 'common/constants';

import dataStructurelast from '../dataManager/structures/last';
import dataStructurerange from '../dataManager/structures/range';

import dynamicViewSchema from './DynamicView/DynamicView.schema.json';
import plotViewSchema from './PlotView/PlotView.schema.json';
import textViewSchema from './TextView/TextView.schema.json';

import dynamicViewModule from './DynamicView';
import plotViewModule from './PlotView';
import textViewModule from './TextView';

import * as constants from './constants';

const list = {
  [constants.VM_VIEW_PLOT]: {
    schema: plotViewSchema,
    viewModule: plotViewModule,
    structureType: DATASTRUCTURETYPE_RANGE,
    structureModule: dataStructurerange,
  },
  [constants.VM_VIEW_TEXT]: {
    schema: textViewSchema,
    viewModule: textViewModule,
    structureType: DATASTRUCTURETYPE_LAST,
    structureModule: dataStructurelast,
  },
  [constants.VM_VIEW_DYNAMIC]: {
    schema: dynamicViewSchema,
    viewModule: dynamicViewModule,
    structureType: DATASTRUCTURETYPE_LAST,
    structureModule: dataStructurelast,
  },
};

export default list;
export * from './selectors';
export { default as configurationReducers } from './reducers';

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
