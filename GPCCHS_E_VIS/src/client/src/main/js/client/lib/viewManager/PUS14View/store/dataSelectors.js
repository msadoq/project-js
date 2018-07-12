import { getViewTitle } from 'store/reducers/views/index';
import _getOr from 'lodash/fp/getOr';
import { VM_VIEW_PUS14 } from '../../constants';

const getFullTitle = getViewTitle;
const PUS14Data = `${VM_VIEW_PUS14}Data`;
const PUS14Configuration = `${VM_VIEW_PUS14}Configuration`;

export const getPUS14ViewData = state => state[PUS14Data];
export const getData = (state, { viewId }) => state[PUS14Data][viewId];

const getEntryPointsByViewId = (state, { viewId }) => (
  _getOr([], [PUS14Configuration, viewId, 'entryPoints'], state)
);

export default {
  getEntryPointsByViewId,
  getFullTitle,
};
