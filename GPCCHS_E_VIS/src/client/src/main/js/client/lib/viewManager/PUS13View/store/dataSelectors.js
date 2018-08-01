import { getViewTitle } from 'store/reducers/views/index';
import _getOr from 'lodash/fp/getOr';
import { VM_VIEW_PUS13 } from '../../constants';

const getFullTitle = getViewTitle;
const PUS13Data = `${VM_VIEW_PUS13}Data`;
const PUS13Configuration = `${VM_VIEW_PUS13}Configuration`;

export const getPUS13ViewData = state => state[PUS13Data];
export const getData = (state, { viewId }) => state[PUS13Data][viewId];

const getEntryPointsByViewId = (state, { viewId }) => (
  _getOr([], [PUS13Configuration, viewId, 'entryPoints'], state)
);

export default {
  getEntryPointsByViewId,
  getFullTitle,
};
