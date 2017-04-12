/* eslint-disable global-require, "DV6 TBC_CNES Because mainProcess can't statically resolve react components" */
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

import plotViewSchema from './PlotView/PlotView.schema.json';
import textViewSchema from './TextView/TextView.schema.json';
import dynamicViewSchema from './DynamicView/DynamicView.schema.json';
import historyViewSchema from './HistoryView/HistoryView.schema.json';
import packetViewSchema from './PacketView/PacketView.schema.json';

import plotViewModule from './PlotView';
import textViewModule from './TextView';
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
    getViewComponent: () => require('./PlotView/Components/View/PlotViewContainer'),
    getEditorComponent: () => require('./PlotView/Components/Editor/PlotEditorContainer'),
  },
  [constants.VM_VIEW_TEXT]: {
    schema: textViewSchema,
    viewModule: textViewModule,
    structureType: DATASTRUCTURETYPE_LAST,
    structureModule: textViewData,
    getViewComponent: () => require('./TextView/Components/View/TextViewContainer'),
    getEditorComponent: () => require('./TextView/Components/Editor/TextEditorContainer'),
  },
  [constants.VM_VIEW_DYNAMIC]: {
    schema: dynamicViewSchema,
    viewModule: dynamicViewModule,
    structureType: DATASTRUCTURETYPE_LAST,
    structureModule: dynamicViewData,
    getViewComponent: () => require('./DynamicView/Components/View/DynamicViewContainer'),
    getEditorComponent: () => require('./DynamicView/Components/Editor/DynamicEditorContainer'),
  },
  [constants.VM_VIEW_HISTORY]: {
    schema: historyViewSchema,
    viewModule: historyViewModule,
    structureType: DATASTRUCTURETYPE_LIST,
    structureModule: historyViewData,
    getViewComponent: () => require('./HistoryView/Components/View/HistoryViewContainer'),
    getEditorComponent: () => require('./HistoryView/Components/Editor/HistoryEditorContainer'),
  },
  [constants.VM_VIEW_PACKET]: {
    schema: packetViewSchema,
    viewModule: packetViewModule,
    structureType: DATASTRUCTURETYPE_LIST,
    structureModule: packetViewData,
    getViewComponent: () => require('./PacketView/Components/View/PacketViewContainer'),
    getEditorComponent: () => require('./PacketView/Components/Editor/PacketEditorContainer'),
  },
};

export default list;
export * from './selectors';
export * from './reducers';

export const getViewComponent = (type) => {
  isViewTypeExists(type);
  return list[type].getViewComponent();
};

export const getEditorComponent = (type) => {
  isViewTypeExists(type);
  return list[type].getEditorComponent();
};

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
