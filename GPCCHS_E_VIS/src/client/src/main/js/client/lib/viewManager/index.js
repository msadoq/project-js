/* eslint-disable global-require, "DV6 TBC_CNES Because mainProcess can't statically resolve react components" */
import {
  DATASTRUCTURETYPE_LAST,
  DATASTRUCTURETYPE_RANGE,
  LOWER_BOUND_TYPE,
  ZERO_BOUND_TYPE } from '../constants';

import plotViewData from './PlotView/data';
import textViewData from './TextView/data';
import dynamicViewData from './DynamicView/data';
import mimicViewData from './MimicView/data';
import historyViewData from './HistoryView/data';
import packetViewData from './PacketView/data';

import plotViewDataSelectors from './PlotView/store/dataSelectors';
import textViewDataSelectors from './TextView/store/dataSelectors';
import dynamicViewDataSelectors from './DynamicView/store/dataSelectors';
import mimicViewDataSelectors from './MimicView/store/dataSelector';
// import historyViewDataSelectors from './HistoryView/store/dataSelectors';
// import packetViewDataSelectors from './PacketView/store/dataSelectors';

import plotViewSchema from './PlotView/PlotView.schema.json';
import textViewSchema from './TextView/TextView.schema.json';
import mimicViewSchema from './MimicView/MimicView.schema.json';
import dynamicViewSchema from './DynamicView/DynamicView.schema.json';
import historyViewSchema from './HistoryView/HistoryView.schema.json';
import packetViewSchema from './PacketView/PacketView.schema.json';

import plotViewModule from './PlotView';
import textViewModule from './TextView';
import mimicViewModule from './MimicView';
import dynamicViewModule from './DynamicView';
import historyViewModule from './HistoryView';
import packetViewModule from './PacketView';

import * as constants from './constants';

const list = {
  [constants.VM_VIEW_PLOT]: {
    schema: plotViewSchema,
    viewModule: plotViewModule,
    structureType: DATASTRUCTURETYPE_RANGE,
    structureModule: plotViewData,
    dataSelectors: plotViewDataSelectors,
    boundType: LOWER_BOUND_TYPE,
  },
  [constants.VM_VIEW_TEXT]: {
    schema: textViewSchema,
    viewModule: textViewModule,
    structureType: DATASTRUCTURETYPE_LAST,
    structureModule: textViewData,
    dataSelectors: textViewDataSelectors,
    boundType: LOWER_BOUND_TYPE,
  },
  [constants.VM_VIEW_DYNAMIC]: {
    schema: dynamicViewSchema,
    viewModule: dynamicViewModule,
    structureType: DATASTRUCTURETYPE_LAST,
    structureModule: dynamicViewData,
    dataSelectors: dynamicViewDataSelectors,
    boundType: LOWER_BOUND_TYPE,
  },
  [constants.VM_VIEW_HISTORY]: {
    schema: historyViewSchema,
    viewModule: historyViewModule,
    structureType: DATASTRUCTURETYPE_RANGE,
    structureModule: historyViewData,
    boundType: LOWER_BOUND_TYPE,
    // dataSelectors: historyViewDataSelectors,
  },
  [constants.VM_VIEW_PACKET]: {
    schema: packetViewSchema,
    viewModule: packetViewModule,
    structureType: DATASTRUCTURETYPE_RANGE,
    structureModule: packetViewData,
    boundType: LOWER_BOUND_TYPE,
    // dataSelectors: packetViewDataSelectors,
  },
  [constants.VM_VIEW_MIMIC]: {
    schema: mimicViewSchema,
    viewModule: mimicViewModule,
    structureType: DATASTRUCTURETYPE_LAST,
    structureModule: mimicViewData,
    dataSelectors: mimicViewDataSelectors,
    boundType: ZERO_BOUND_TYPE,
  },
};

export default list;
export * from './selectors';
export * from './reducers';

export function getAvailableViews() {
  return Object.keys(list);
}

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

export function getDataSelectors(type) {
  isViewTypeExists(type);
  return list[type].dataSelectors;
}

export function getBoundType(type) {
  isViewTypeExists(type);
  return list[type].boundType;
}
