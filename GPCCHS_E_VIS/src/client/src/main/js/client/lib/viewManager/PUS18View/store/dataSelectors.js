import { getViewTitle } from 'store/reducers/views/index';
import _getOr from 'lodash/fp/getOr';
import { VM_VIEW_PUS18 } from '../../constants';

const getFullTitle = getViewTitle;
const PUS18Data = `${VM_VIEW_PUS18}Data`;
const PUS18Configuration = `${VM_VIEW_PUS18}Configuration`;

export const getPUS18ViewData = state => state[PUS18Data];
export const getData = (state, { viewId }) => state[PUS18Data][viewId];

const getEntryPointsByViewId = (state, { viewId }) => (
  _getOr([], [PUS18Configuration, viewId, 'entryPoints'], state)
);

export default {
  getEntryPointsByViewId,
  getFullTitle,
};
