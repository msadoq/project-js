import { getViewTitle } from 'store/reducers/views/index';
import _getOr from 'lodash/fp/getOr';
import { VM_VIEW_PUS12 } from '../../constants';

const getFullTitle = getViewTitle;
const PUS12Data = `${VM_VIEW_PUS12}Data`;
const PUS12Configuration = `${VM_VIEW_PUS12}Configuration`;

export const getData = (state, { viewId }) => state[PUS12Data][viewId];

const getEntryPointsByViewId = (state, { viewId }) => (
  _getOr([], [PUS12Configuration, viewId, 'entryPoints'], state)
);

export default {
  getEntryPointsByViewId,
  getFullTitle,
};
