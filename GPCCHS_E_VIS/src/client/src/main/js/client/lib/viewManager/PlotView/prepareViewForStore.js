import { v4 } from 'uuid';
import _ from 'lodash/fp';

const indexAxes = _.update('axes', _.indexBy(axis => axis.id || axis.label || v4()));

const getDefaultView = _.merge({
  title: 'New Plot View',
  type: 'PlotView',
  backgroundColor: '#FFFFFF',
  defaultRatio: { length: 5, width: 5 },
  links: [],
  configuration: {
    axes: {
      time: {
        id: 'time',
        label: 'Time',
        autoTick: true,
        showTicks: true,
        tickStep: 0.5,
        style: {
          size: 12,
          font: 'Arial',
          align: 'center',
        },
      },
    },
    grids: [{
      showGrid: true,
      line: {
        size: 1,
        style: 'Dashed',
      },
    }],
    legend: { location: 'bottom' },
    markers: [],
    entryPoints: [],
    showYAxes: 'left',
    showLegend: false,
  },
});

export default _.pipe(
  getDefaultView,
  _.update('configuration', _.pipe(
    _.update('entryPoints', _.map(_.update('id', v4))),
    indexAxes
  ))
);
