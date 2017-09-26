// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 16/03/2017 : Split viewManager/index.js in several files
// VERSION : 1.1.2 : DM : #5828 : 05/04/2017 : Rename all prepareConfiguration* in prepareView* in viewManager
// VERSION : 1.1.2 : DM : #5828 : 06/04/2017 : Clean configuration (viewManager) . .
// VERSION : 1.1.2 : DM : #5828 : 06/04/2017 : Change prepareViewFor* behaviors . .
// VERSION : 1.1.2 : DM : #5828 : 07/04/2017 : add entry points to mimic view
// VERSION : 1.1.2 : DM : #5828 : 10/04/2017 : prepare packet and history files
// VERSION : 1.1.2 : DM : #6129 : 04/05/2017 : merge dev on mimic branch
// VERSION : 1.1.2 : DM : #5828 : 10/05/2017 : Save domainName and sessionName in file for view, page and workspace
// VERSION : 1.1.2 : DM : #6129 : 12/05/2017 : Merge dev branch & gauge done
// END-HISTORY
// ====================================================================

export const VM_VIEW_PLOT = 'PlotView';
export const VM_VIEW_TEXT = 'TextView';
export const VM_VIEW_DYNAMIC = 'DynamicView';
export const VM_VIEW_MIMIC = 'MimicView';
export const VM_VIEW_PACKET = 'PacketView';
export const VM_VIEW_HISTORY = 'HistoryView';

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
];
