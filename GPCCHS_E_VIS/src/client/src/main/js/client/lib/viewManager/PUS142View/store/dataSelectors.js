import { getViewTitle } from 'store/reducers/views/index';
import _getOr from 'lodash/fp/getOr';
import { VM_VIEW_PUS142 } from '../../constants';

const getFullTitle = getViewTitle;
const PUS142Data = `${VM_VIEW_PUS142}Data`;
const PUS142Configuration = `${VM_VIEW_PUS142}Configuration`;

export const getData = (state, { viewId }) => state[PUS142Data][viewId];

const getEntryPointsByViewId = (state, { viewId }) => (
  _getOr([], [PUS142Configuration, viewId, 'entryPoints'], state)
);

export default {
  getEntryPointsByViewId,
  getFullTitle,
};
