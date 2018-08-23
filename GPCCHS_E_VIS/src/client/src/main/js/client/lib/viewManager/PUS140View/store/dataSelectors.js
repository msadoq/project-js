import { getViewTitle } from 'store/reducers/views/index';
import _getOr from 'lodash/fp/getOr';
import { VM_VIEW_PUS140 } from '../../constants';

const getFullTitle = getViewTitle;
const PUS140Data = `${VM_VIEW_PUS140}Data`;
const PUS140Configuration = `${VM_VIEW_PUS140}Configuration`;

export const getData = (state, { viewId }) => state[PUS140Data][viewId];

const getEntryPointsByViewId = (state, { viewId }) => (
  _getOr([], [PUS140Configuration, viewId, 'entryPoints'], state)
);

export default {
  getEntryPointsByViewId,
  getFullTitle,
};
