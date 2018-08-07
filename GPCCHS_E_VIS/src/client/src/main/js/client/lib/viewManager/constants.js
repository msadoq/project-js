// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 16/03/2017 : Split viewManager/index.js in several files
// VERSION : 1.1.2 : DM : #5828 : 05/04/2017 : Rename all prepareConfiguration* in prepareView* in
//  viewManager
// VERSION : 1.1.2 : DM : #5828 : 06/04/2017 : Clean configuration (viewManager) . .
// VERSION : 1.1.2 : DM : #5828 : 06/04/2017 : Change prepareViewFor* behaviors . .
// VERSION : 1.1.2 : DM : #5828 : 07/04/2017 : add entry points to mimic view
// VERSION : 1.1.2 : DM : #5828 : 10/04/2017 : prepare packet and history files
// VERSION : 1.1.2 : DM : #6129 : 04/05/2017 : merge dev on mimic branch
// VERSION : 1.1.2 : DM : #5828 : 10/05/2017 : Save domainName and sessionName in file for view,
//  page and workspace
// VERSION : 1.1.2 : DM : #6129 : 12/05/2017 : Merge dev branch & gauge done
// VERSION : 2.0.0 : DM : #5806 : 29/09/2017 : Update viewManager with alarm parameters
// END-HISTORY
// ====================================================================
import constants from 'constants';

export const VM_VIEW_PLOT = 'PlotView';
export const VM_VIEW_TEXT = 'TextView';
export const VM_VIEW_DYNAMIC = 'DynamicView';
export const VM_VIEW_MIMIC = 'MimicView';
export const VM_VIEW_PACKET = 'PacketView';
export const VM_VIEW_HISTORY = 'HistoryView';
export const VM_VIEW_GROUNDALARM = 'GroundAlarmView';
export const VM_VIEW_ONBOARDALARM = 'OnboardAlarmView';
export const VM_VIEW_PUS03 = 'PUS03View';
export const VM_VIEW_PUS05 = 'PUS05View';
export const VM_VIEW_PUS11 = 'PUS11View';
export const VM_VIEW_PUS12 = 'PUS12View';
export const VM_VIEW_PUS13 = 'PUS13View';
export const VM_VIEW_PUS14 = 'PUS14View';
export const VM_VIEW_PUS15 = 'PUS15View';
export const VM_VIEW_PUS18 = 'PUS18View';
export const VM_VIEW_PUS19 = 'PUS19View';
export const VM_VIEW_PUS140 = 'PUS140View';
export const VM_VIEW_PUS142 = 'PUS142View';
export const VM_VIEW_PUS144 = 'PUS144View';
export const VM_VIEW_PUSMME = 'PUSMMEView';
export const VM_VIEW_DECOMMUTEDPACKET = 'DecommutedPacketView';

export const VM_COMMON_PROPERTIES = [
  'type',
  'title',
  'titleStyle',
  'backgroundColor',
  'links',
  'defaultRatio',
  'procedures',
  'domainName',
  'sessionName',
  'version',
];

export const VM_PUS_VIEWS = [
  VM_VIEW_PUS03,
  VM_VIEW_PUS05,
  VM_VIEW_PUS11,
  VM_VIEW_PUS12,
  VM_VIEW_PUS13,
  VM_VIEW_PUS14,
  VM_VIEW_PUS15,
  VM_VIEW_PUS18,
  VM_VIEW_PUS19,
  VM_VIEW_PUS140,
  VM_VIEW_PUS142,
  VM_VIEW_PUS144,
  VM_VIEW_PUSMME,
];

// pus models
export const MODELS = [
  constants.Pus005ModelType,
  constants.Pus011ModelType,
  constants.Pus011ModelType,
  constants.Pus012ModelType,
  constants.Pus013ModelType,
  constants.Pus014ModelType,
  constants.Pus015ModelType,
  constants.Pus018ModelType,
  constants.Pus019ModelType,
  constants.Pus140ModelType,
  constants.Pus142ModelType,
  constants.Pus144ModelType,
  constants.PusMmeModelType,
];

/**
 * @param type
 * @returns {boolean}
 */
export const isPusView = type => VM_PUS_VIEWS.includes(type);
