/* eslint-disable global-require, "DV6 TBC_CNES Because mainProcess can't statically resolve react components" */
import * as constants from './constants';

const list = {
  [constants.VM_VIEW_PLOT]: {
    getViewComponent: () => require('./PlotView/Components/View/PlotViewContainer'),
    getEditorComponent: () => require('./PlotView/Components/Editor/PlotEditorContainer'),
  },
  [constants.VM_VIEW_TEXT]: {
    getViewComponent: () => require('./TextView/Components/View/TextViewContainer'),
    getEditorComponent: () => require('./TextView/Components/Editor/TextEditorContainer'),
  },
  [constants.VM_VIEW_DYNAMIC]: {
    getViewComponent: () => require('./DynamicView/Components/View/DynamicViewContainer'),
    getEditorComponent: () => require('./DynamicView/Components/Editor/DynamicEditorContainer'),
  },
  [constants.VM_VIEW_HISTORY]: {
    getViewComponent: () => require('./HistoryView/Components/View/HistoryViewContainer'),
    getEditorComponent: () => require('./HistoryView/Components/Editor/HistoryEditorContainer'),
  },
  [constants.VM_VIEW_PACKET]: {
    getViewComponent: () => require('./PacketView/Components/View/PacketViewContainer'),
    getEditorComponent: () => require('./PacketView/Components/Editor/PacketEditorContainer'),
  },
  [constants.VM_VIEW_MIMIC]: {
    getViewComponent: () => require('./MimicView/Components/View/MimicViewContainer'),
    getEditorComponent: () => require('./MimicView/Components/Editor/MimicEditorContainer'),
  },
};

export const getViewComponent = (type) => {
  isViewTypeExists(type);
  return list[type].getViewComponent();
};

export const getEditorComponent = (type) => {
  isViewTypeExists(type);
  return list[type].getEditorComponent();
};

function isViewTypeExists(type) {
  if (!list[type]) {
    // important! throwing helps error detection during development
    throw new Error(`Invalid viewManager call for type ${type}`);
  }
}
