import { v4 } from 'uuid';
import _ from 'lodash/fp';

const indexAxes = _.update('axes', _.indexBy(axis => axis.id || axis.label || v4()));

const getDefaultConfiguration = _.merge({
  type: 'PlotView',
  axes: {},
  grids: [],
  legend: {},
  markers: [],
  backgroundColor: '3FFFFFF',
  defaultRatio: { length: 5, width: 5 },
  entryPoints: [],
  links: [],
  title: 'New Plot View',
  showYAxes: 'left',
});

export default _.update('configuration', _.pipe(
    getDefaultConfiguration,
    indexAxes,
    _.update('entryPoints', _.map(_.update('id', v4)))
  )
);
