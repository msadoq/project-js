import { getViewTitle } from 'store/reducers/views/index';
import _getOr from 'lodash/fp/getOr';
import { VM_VIEW_PUS15 } from '../../constants';

const getFullTitle = getViewTitle;
const PUS15Data = `${VM_VIEW_PUS15}Data`;
const PUS15Configuration = `${VM_VIEW_PUS15}Configuration`;

export const getPUS15ViewData = state => state[PUS15Data];
export const getData = (state, { viewId }) => state[PUS15Data][viewId];

const getEntryPointsByViewId = (state, { viewId }) => (
  _getOr([], [PUS15Configuration, viewId, 'entryPoints'], state)
);

export default {
  getEntryPointsByViewId,
  getFullTitle,
};
