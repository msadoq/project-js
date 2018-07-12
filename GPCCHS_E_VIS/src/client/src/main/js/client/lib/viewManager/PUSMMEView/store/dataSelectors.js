import { getViewTitle } from 'store/reducers/views/index';
import _getOr from 'lodash/fp/getOr';
import { VM_VIEW_PUSMME } from '../../constants';

const getFullTitle = getViewTitle;
const PUSMMEData = `${VM_VIEW_PUSMME}Data`;
const PUSMMEConfiguration = `${VM_VIEW_PUSMME}Configuration`;

export const getPUSMMEViewData = state => state[PUSMMEData];
export const getData = (state, { viewId }) => state[PUSMMEData][viewId];

const getEntryPointsByViewId = (state, { viewId }) => (
  _getOr([], [PUSMMEConfiguration, viewId, 'entryPoints'], state)
);

export default {
  getEntryPointsByViewId,
  getFullTitle,
};
