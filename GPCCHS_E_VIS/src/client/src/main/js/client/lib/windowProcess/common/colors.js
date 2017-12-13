// ====================================================================
// HISTORY
// VERSION : 1.1.0 : : : 28/02/2017 : Initial version
// VERSION : 1.1.2 : DM : #3622 : 23/02/2017 : StateColors serialized in localid and present in viewData
// VERSION : 1.1.2 : DM : #5828 : 14/06/2017 : Move common/log and common/parameters in client/
// END-HISTORY
// ====================================================================

import _map from 'lodash/map';
import { get } from 'common/configurationManager';

const colors = [
  '#FFFFFF', '#000000', '#f44336', '#e91e63', '#9c27b0',
  '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4',
  '#009688', '#4caf50', '#8bc34a', '#cddc39', '#ffeb3b',
  '#ffc107', '#ff9800', '#795548', '#607d8b',
];

const getRandomColor = () => colors[Math.floor(Math.random() * colors.length)];

const getStateColors = () => get('STATE_COLORS');

const getStateColorFilters = () => (
  _map(getStateColors(), (color, monitoringState) => (
    {
      color,
      condition: {
        field: 'monitoringState',
        operator: '=',
        operand: monitoringState,
      },
    }
)));

const getStateColorsCSSVars =
  () => Object.keys(getStateColors()).map(k => ({
    [`--monit-${k}`]: getStateColors()[k],
  }))
  .reduce((acc, c) => ({
    ...acc,
    ...c,
  }), {});

export default {
  colors,
  getRandomColor,
  getStateColors,
  getStateColorFilters,
  getStateColorsCSSVars,
};
