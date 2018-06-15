import { getViewTitle } from 'store/reducers/views/index';
import _getOr from 'lodash/fp/getOr';
import { VM_VIEW_PUS05 } from '../../constants';

const getFullTitle = getViewTitle;
const PUS05Data = `${VM_VIEW_PUS05}Data`;
const PUS05Configuration = `${VM_VIEW_PUS05}Configuration`;

export const getPUS05ViewData = state => state[PUS05Data];
export const getData = (state, { viewId }) => state[PUS05Data][viewId];

const getEntryPointsByViewId = (state, { viewId }) => (
  _getOr([], [PUS05Configuration, viewId, 'entryPoints'], state)
);

export default {
  getEntryPointsByViewId,
  getFullTitle,
};
