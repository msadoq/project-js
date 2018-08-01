import { getViewTitle } from 'store/reducers/views/index';
import _getOr from 'lodash/fp/getOr';
import { VM_VIEW_PUS144 } from '../../constants';

const getFullTitle = getViewTitle;
const PUS144Data = `${VM_VIEW_PUS144}Data`;
const PUS144Configuration = `${VM_VIEW_PUS144}Configuration`;

export const getPUS144ViewData = state => state[PUS144Data];
export const getData = (state, { viewId }) => state[PUS144Data][viewId];

const getEntryPointsByViewId = (state, { viewId }) => (
  _getOr([], [PUS144Configuration, viewId, 'entryPoints'], state)
);

export default {
  getEntryPointsByViewId,
  getFullTitle,
};
