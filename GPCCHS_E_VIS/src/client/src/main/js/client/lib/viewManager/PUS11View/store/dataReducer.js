// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #6127 : 12/04/2017 : Prepare minimalistic HistoryView . .
// VERSION : 1.1.2 : DM : #6127 : 12/09/2017 : Creation of history view data store
// VERSION : 1.1.2 : DM : #6127 : 12/09/2017 : Update of history view data store
// END-HISTORY
// ====================================================================

// @todo remove stub data

/* eslint-disable complexity, "DV6 TBC_CNES Redux reducers should be implemented as switch case" */
import { VM_VIEW_PUS11 } from '../../constants';
import createScopedDataReducer from '../../commonData/createScopedDataReducer';

function pus11DataReducer(state = {}, action) {
  switch (action.type) {
    // TODO: add specialized action handlers
    default:
      return state;
  }
}

export default createScopedDataReducer(pus11DataReducer, {}, VM_VIEW_PUS11);

export const getPUS11ViewData = state => state[`${VM_VIEW_PUS11}Data`];
export const getData = (state, { viewId }) => state[`${VM_VIEW_PUS11}Data`][viewId];
export const getConfiguration = (state, { viewId }) => state[`${VM_VIEW_PUS11}Configuration`][viewId];
