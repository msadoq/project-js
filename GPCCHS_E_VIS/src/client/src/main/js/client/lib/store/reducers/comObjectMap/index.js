import * as types from 'store/types';
import { createSelector } from 'reselect';

/* --- Reducer -------------------------------------------------------------- */

const initialState = {
  fields: {},
};

/**
 * Update comObjectMap in Redux store.
 * @param {object} state - The current state.
 * @param {object} action - The action dispatched.
 * @return {object} The new state.
 */
export default function comObjectMap(state = initialState, action) {
  switch (action.type) {
    case types.SET_COM_OBJECT_MAP:
      return {
        ...state,
        fields: action.payload.newComObjectMap,
      };
    default:
      return state;
  }
}

/* --- Selectors ------------------------------------------------------------ */

export const getComObjectMap = state => state.comObjectMap.fields;

/**
 * Get the fields array for a given comObjectName.
 * @param {object} state - The current state.
 * @param {object} name - Com object name.
 * @return {array} Array of fields name.
 */
export const getFieldsListByComObjectName = createSelector(
  (state, name) => name,
  getComObjectMap,
  (_name, _comObjectMap) => _comObjectMap[_name]
);

/**
 * Get the fields array for a given comObjectName.
 * @param {object} state - The current state.
 * @param {object} name - Com object name.
 * @return {array} Array of fields name.
 */
export const getTimeFieldsByComObjectName = createSelector(
  getFieldsListByComObjectName,
  _comObjectMap => (_comObjectMap
    ? _comObjectMap.filter(c => c.type === 'ccsds_mal.protobuf.TIME')
    : [])
);
