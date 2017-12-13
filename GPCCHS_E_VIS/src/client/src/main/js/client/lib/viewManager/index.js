// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #3622 : 17/02/2017 : Move VIVL files in lib/viewManager and fix plenty of inline view/structure type specific code
// VERSION : 1.1.2 : DM : #3622 : 24/02/2017 : MenuManager use now viewManager to generate view menu
// VERSION : 1.1.2 : DM : #5828 : 15/03/2017 : add view manager constants .
// VERSION : 1.1.2 : DM : #5828 : 16/03/2017 : Split viewManager/index.js in several files
// VERSION : 1.1.2 : DM : #5828 : 16/03/2017 : Write first configurationReducer (TextView) .
// VERSION : 1.1.2 : DM : #5828 : 16/03/2017 : Add PlotView and DynamicView configurationReducer in viewManager
// VERSION : 1.1.2 : DM : #5828 : 16/03/2017 : Refacto viewManager/index.js configuration reducers .
// VERSION : 1.1.2 : DM : #5828 : 22/03/2017 : remove structure last and range
// VERSION : 1.1.2 : DM : #5828 : 06/04/2017 : Change prepareViewFor* behaviors . .
// VERSION : 1.1.2 : DM : #5828 : 07/04/2017 : add entry points to mimic view
// VERSION : 1.1.2 : DM : #5828 : 10/04/2017 : prepare packet and history files
// VERSION : 1.1.2 : DM : #5828 : 11/04/2017 : Implement automation for data reducers in viewManager
// VERSION : 1.1.2 : DM : #5828 : 11/04/2017 : Add getEditorComponent . . .
// VERSION : 1.1.2 : DM : #5828 : 11/04/2017 : Add getViewComponent function in viewManager
// VERSION : 1.1.2 : DM : #6127 : 12/04/2017 : Prepare minimalistic HistoryView . .
// VERSION : 1.1.2 : DM : #6127 : 12/04/2017 : Prepare minimalistic HistoryView using SkeletonView
// VERSION : 1.1.2 : DM : #5828 : 26/04/2017 : request modification to add forecast
// VERSION : 1.1.2 : DM : #5822 : 03/05/2017 : Inspector : display dynamic data
// VERSION : 1.1.2 : DM : #5828 : 04/05/2017 : Restore viewManager . . .
// VERSION : 1.1.2 : DM : #5828 : 04/05/2017 : Fix manageRTD.sh . . .
// VERSION : 1.1.2 : DM : #5828 : 04/05/2017 : Fix 'npm run build' .
// VERSION : 1.1.2 : DM : #6129 : 04/05/2017 : merge dev on mimic branch
// VERSION : 1.1.2 : DM : #6129 : 09/05/2017 : Merge branch 'dev' into abesson-mimic
// VERSION : 1.1.2 : DM : #6129 : 09/05/2017 : apply viewManager modifications to mimicView
// VERSION : 1.1.2 : DM : #6785 : 31/05/2017 : Add Misc/links in view editor
// VERSION : 1.1.2 : DM : #5828 : 13/06/2017 : Move common/constants/ in client/ folder
// VERSION : 1.1.2 : DM : #5822 : 21/06/2017 : add context menu in mimiv view to open entry points in inspector
// VERSION : 1.1.2 : DM : #6700 : 21/07/2017 : Separate perTdbId by structure type in dataMap
// VERSION : 1.1.2 : DM : #6700 : 24/07/2017 : remove lastFrom0 from datamap add a test to keep the good interval in datamap
// VERSION : 1.1.2 : DM : #6700 : 31/07/2017 : remove lower bound type from viewManager
// END-HISTORY
// ====================================================================

/* eslint-disable global-require, "DV6 TBC_CNES Because mainProcess can't statically resolve react components" */
import {
  DATASTRUCTURETYPE_LAST,
  DATASTRUCTURETYPE_RANGE,
} from '../constants';

import plotViewSchema from './PlotView/PlotView.schema.json';
import textViewData from './TextView/data';
import dynamicViewData from './DynamicView/data';
import mimicViewData from './MimicView/data';
import historyViewData from './HistoryView/data';
import packetViewData from './PacketView/data';
import groundAlarmViewData from './GroundAlarmView/data';
import onboardAlarmViewData from './OnboardAlarmView/data';

import plotViewDataSelectors from './PlotView/store/dataSelectors';
import textViewDataSelectors from './TextView/store/dataSelectors';
import dynamicViewDataSelectors from './DynamicView/store/dataSelectors';
import mimicViewDataSelectors from './MimicView/store/dataSelector';
import groundAlarmViewDataSelectors from './GroundAlarmView/store/dataSelectors';
import onboardAlarmViewDataSelectors from './OnboardAlarmView/store/dataSelectors';
import historyViewDataSelectors from './HistoryView/store/dataSelectors';
import packetViewDataSelectors from './PacketView/store/dataSelectors';

import * as constants from './constants';
import textViewSchema from './TextView/TextView.schema.json';
import mimicViewSchema from './MimicView/MimicView.schema.json';
import dynamicViewSchema from './DynamicView/DynamicView.schema.json';
import historyViewSchema from './HistoryView/HistoryView.schema.json';
import packetViewSchema from './PacketView/PacketView.schema.json';
import groundAlarmViewSchema from './GroundAlarmView/GroundAlarmView.schema.json';
import onboardAlarmViewSchema from './OnboardAlarmView/OnboardAlarmView.schema.json';

import plotViewModule from './PlotView';
import textViewModule from './TextView';
import mimicViewModule from './MimicView';
import dynamicViewModule from './DynamicView';
import historyViewModule from './HistoryView';
import packetViewModule from './PacketView';
import groundAlarmViewModule from './GroundAlarmView';
import onboardAlarmViewModule from './OnboardAlarmView';


import plotViewData from './PlotView/data';

const list = {
  [constants.VM_VIEW_PLOT]: {
    schema: plotViewSchema,
    viewModule: plotViewModule,
    structureType: DATASTRUCTURETYPE_RANGE,
    structureModule: plotViewData,
    dataSelectors: plotViewDataSelectors,
  },
  [constants.VM_VIEW_TEXT]: {
    schema: textViewSchema,
    viewModule: textViewModule,
    structureType: DATASTRUCTURETYPE_LAST,
    structureModule: textViewData,
    dataSelectors: textViewDataSelectors,
  },
  [constants.VM_VIEW_DYNAMIC]: {
    schema: dynamicViewSchema,
    viewModule: dynamicViewModule,
    structureType: DATASTRUCTURETYPE_LAST,
    structureModule: dynamicViewData,
    dataSelectors: dynamicViewDataSelectors,
  },
  [constants.VM_VIEW_HISTORY]: {
    schema: historyViewSchema,
    viewModule: historyViewModule,
    structureType: DATASTRUCTURETYPE_RANGE,
    structureModule: historyViewData,
    dataSelectors: historyViewDataSelectors,
  },
  [constants.VM_VIEW_PACKET]: {
    schema: packetViewSchema,
    viewModule: packetViewModule,
    structureType: DATASTRUCTURETYPE_RANGE,
    structureModule: packetViewData,
    dataSelectors: packetViewDataSelectors,
  },
  [constants.VM_VIEW_MIMIC]: {
    schema: mimicViewSchema,
    viewModule: mimicViewModule,
    structureType: DATASTRUCTURETYPE_LAST,
    structureModule: mimicViewData,
    dataSelectors: mimicViewDataSelectors,
  },
  [constants.VM_VIEW_GROUNDALARM]: {
    schema: groundAlarmViewSchema,
    viewModule: groundAlarmViewModule,
    structureType: DATASTRUCTURETYPE_RANGE,
    structureModule: groundAlarmViewData,
    dataSelectors: groundAlarmViewDataSelectors,
  },
  [constants.VM_VIEW_ONBOARDALARM]: {
    schema: onboardAlarmViewSchema,
    viewModule: onboardAlarmViewModule,
    structureType: DATASTRUCTURETYPE_RANGE,
    structureModule: onboardAlarmViewData,
    dataSelectors: onboardAlarmViewDataSelectors,
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
