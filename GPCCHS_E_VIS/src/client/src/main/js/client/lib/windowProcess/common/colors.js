import { get } from 'common/parameters';

const colors = [
  '#FFFFFF', '#000000', '#f44336', '#e91e63', '#9c27b0',
  '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4',
  '#009688', '#4caf50', '#8bc34a', '#cddc39', '#ffeb3b',
  '#ffc107', '#ff9800', '#795548', '#607d8b',
];

const getRandomColor = () => colors[Math.floor(Math.random() * colors.length)];

const stateColors = get('STATE_COLORS');

const getStateColorsCSSVars =
  () => Object.keys(stateColors).map(k => ({
    [`--monit-${k}`]: stateColors[k],
  }))
  .reduce((acc, c) => ({
    ...acc,
    ...c,
  }), {});

export default {
  colors,
  getRandomColor,
  stateColors,
  getStateColorsCSSVars,
};
