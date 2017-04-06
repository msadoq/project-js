import { v4 } from 'uuid';
import _ from 'lodash/fp';

const indexAxes = _.update('axes', _.indexBy(axis => axis.id || axis.label || v4()));

const getDefaultView = _.merge({
  title: 'New Plot View',
  type: 'PlotView',
  backgroundColor: '3FFFFFF',
  defaultRatio: { length: 5, width: 5 },
  links: [],
  configuration: {
    axes: {},
    grids: [],
    legend: {},
    markers: [],
    entryPoints: [],
    showYAxes: 'left',
  },
});

export default _.pipe(
  getDefaultView,
  _.update('configuration', _.pipe(
    _.update('entryPoints', _.map(_.update('id', v4))),
    indexAxes
  ))
);
