import { getViewTitle } from 'store/reducers/views/index';
import _getOr from 'lodash/fp/getOr';
import { VM_VIEW_PUS19 } from '../../constants';

const getFullTitle = getViewTitle;
const PUS19Data = `${VM_VIEW_PUS19}Data`;
const PUS19Configuration = `${VM_VIEW_PUS19}Configuration`;

export const getData = (state, { viewId }) => state[PUS19Data][viewId];

const getEntryPointsByViewId = (state, { viewId }) => (
  _getOr([], [PUS19Configuration, viewId, 'entryPoints'], state)
);

export default {
  getEntryPointsByViewId,
  getFullTitle,
};
