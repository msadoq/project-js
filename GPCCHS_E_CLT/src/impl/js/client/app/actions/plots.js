export const PLOT_ADD_POINTS = 'PLOT_ADD_POINTS';

export function addPoints(plotId, points) {
  return {
    type: PLOT_ADD_POINTS,
    plotId,
    points,
  };
}
