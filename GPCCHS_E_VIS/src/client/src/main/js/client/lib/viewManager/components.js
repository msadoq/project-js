// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 04/05/2017 : Fix 'npm run build' .
// VERSION : 1.1.2 : DM : #6129 : 09/05/2017 : apply viewManager modifications to mimicView
// END-HISTORY
// ====================================================================

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
    getSearchComponent: () => require('./TextView/Components/Search/TextSearchContainer'),
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
  [constants.VM_VIEW_GROUNDALARM]: {
    getViewComponent: () => require('./GroundAlarmView/Components/View/GroundAlarmView'),
    getEditorComponent: () =>
      require('./GroundAlarmView/Components/Editor/GroundAlarmEditorContainer'),
  },
  [constants.VM_VIEW_ONBOARDALARM]: {
    getViewComponent: () => require('./OnboardAlarmView/Components/View/OnboardAlarmView'),
    getEditorComponent: () =>
      require('./OnboardAlarmView/Components/Editor/OnboardAlarmEditorContainer'),
  },
  [constants.VM_VIEW_PUS11]: {
    getViewComponent: () => require('../viewManager/PUS11View/Components/View/PUS11ViewContainer'),
    getEditorComponent: () => require('../viewManager/PUS11View/Components/Editor/PUS11EditorContainer'),
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

export const getSearchComponent = (type) => {
  isViewTypeExists(type);
  return list[type].getSearchComponent();
};

function isViewTypeExists(type) {
  if (!list[type]) {
    // important! throwing helps error detection during development
    throw new Error(`Invalid viewManager call for type ${type}`);
  }
}
