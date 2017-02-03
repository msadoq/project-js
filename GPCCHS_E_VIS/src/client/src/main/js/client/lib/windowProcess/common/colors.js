const colors = [
  '#FFFFFF', '#000000', '#f44336', '#e91e63', '#9c27b0',
  '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4',
  '#009688', '#4caf50', '#8bc34a', '#cddc39', '#ffeb3b',
  '#ffc107', '#ff9800', '#795548', '#607d8b',
];

const getRandomColor = () => colors[Math.floor(Math.random() * colors.length)];

const monitoringStateColors = {
  ok: '#00FF33',          /* vert */
  info: '#FFFF33',        /* jaune */
  warning: '#FF6600',     /* orange */
  alarm: '#FD1C03',       /* rouge orangé */
  severe: '#9900FF',      /* violet */
  critical: '#DD0000',    /* rouge */
  outOfRange: '#999999',  /* gris */
};

const getMonitoringStateColorsCSSVars =
  () => Object.keys(monitoringStateColors).map(k => ({
    [`--monit-${k}`]: monitoringStateColors[k],
  }))
  .reduce((acc, c) => ({
    ...acc,
    ...c,
  }), {});

export default {
  colors,
  getRandomColor,
  monitoringStateColors,
  getMonitoringStateColorsCSSVars,
};
