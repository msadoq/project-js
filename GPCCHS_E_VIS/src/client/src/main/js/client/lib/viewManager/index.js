import {
  DATASTRUCTURETYPE_LAST,
  DATASTRUCTURETYPE_RANGE,
  DATASTRUCTURETYPE_LIST,
} from 'common/constants';

import plotViewData from './PlotView/data';
import textViewData from './TextView/data';
import dynamicViewData from './DynamicView/data';
import historyViewData from './HistoryView/data';
import packetViewData from './PacketView/data';

import dynamicViewSchema from './DynamicView/DynamicView.schema.json';
import plotViewSchema from './PlotView/PlotView.schema.json';
import textViewSchema from './TextView/TextView.schema.json';
import historyViewSchema from './HistoryView/HistoryView.schema.json';
import packetViewSchema from './PacketView/PacketView.schema.json';

import dynamicViewModule from './DynamicView';
import plotViewModule from './PlotView';
import textViewModule from './TextView';
import historyViewModule from './HistoryView';
import packetViewModule from './PacketView';

import * as constants from './constants';

const list = {
  [constants.VM_VIEW_PLOT]: {
    schema: plotViewSchema,
    viewModule: plotViewModule,
    structureType: DATASTRUCTURETYPE_RANGE,
    structureModule: plotViewData,
  },
  [constants.VM_VIEW_TEXT]: {
    schema: textViewSchema,
    viewModule: textViewModule,
    structureType: DATASTRUCTURETYPE_LAST,
    structureModule: textViewData,
  },
  [constants.VM_VIEW_DYNAMIC]: {
    schema: dynamicViewSchema,
    viewModule: dynamicViewModule,
    structureType: DATASTRUCTURETYPE_LAST,
    structureModule: dynamicViewData,
  },
  [constants.VM_VIEW_HISTORY]: {
    schema: historyViewSchema,
    viewModule: historyViewModule,
    structureType: DATASTRUCTURETYPE_LIST,
    structureModule: historyViewData,
  },
  [constants.VM_VIEW_PACKET]: {
    schema: packetViewSchema,
    viewModule: packetViewModule,
    structureType: DATASTRUCTURETYPE_LIST,
    structureModule: packetViewData,
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
