// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 04/05/2017 : Fix 'npm run build' .
// VERSION : 1.1.2 : DM : #6129 : 09/05/2017 : apply viewManager modifications to mimicView
// VERSION : 2.0.0 : DM : #5806 : 29/09/2017 : Update viewManager with alarm parameters
// VERSION : 2.0.0 : DM : #5806 : 13/10/2017 : Replace GroundAlarmViewContainer by
//  GroundAlarmTableContainer .
// VERSION : 2.0.0 : DM : #5806 : 26/10/2017 : Fork GMA to OBA (viewManager)
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
  },
  [constants.VM_VIEW_DYNAMIC]: {
    getViewComponent: () => require('./DynamicView/Components/View/DynamicViewContainer'),
    getEditorComponent: () => require('./DynamicView/Components/Editor/DynamicEditorContainer'),
  },
  [constants.VM_VIEW_DECOMMUTEDPACKET]: {
    getViewComponent: () => require('./DecommutedPacketView/Components/View/DecommutedPacketViewContainer'),
    getEditorComponent: () => require('./DecommutedPacketView/Components/Editor/DecommutedPacketEditorContainer'),
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
  [constants.VM_VIEW_PUS05]: {
    getViewComponent: () => require('../viewManager/PUS05View/Components/View/PUS05ViewContainer'),
    getEditorComponent: () => require('../viewManager/PUS05View/Components/Editor/PUS05EditorContainer'),
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

function isViewTypeExists(type) {
  if (!list[type]) {
    // important! throwing helps error detection during development
    throw new Error(`Invalid viewManager call for type ${type}`);
  }
}
