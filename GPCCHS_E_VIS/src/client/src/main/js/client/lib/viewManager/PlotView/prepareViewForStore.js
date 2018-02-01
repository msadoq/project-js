// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 05/04/2017 : Rename all prepareConfiguration* in prepareView* in viewManager
// VERSION : 1.1.2 : DM : #5828 : 06/04/2017 : Clean configuration (viewManager) . .
// VERSION : 1.1.2 : FA : ISIS-FT-2134 : 18/05/2017 : Porting #6660 patch 9 to version 1.2. Changing default PlotView props (axis, grid).
// VERSION : 1.1.2 : DM : #6829 : 11/07/2017 : PlotView legend and legend location : defaultValues.
// VERSION : 1.1.2 : DM : #6829 : 13/07/2017 : Fixing incorrect hexadecimal value, 3FFFFFF -> #FFFFFF .
// VERSION : 1.1.2 : FA : #7377 : 01/08/2017 : Fix plot axes in editor
// VERSION : 1.1.2 : DM : #6700 : 03/08/2017 : Merge branch 'dev' into dbrugne-data
// END-HISTORY
// ====================================================================

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
          bold: false,
          italic: false,
          underline: false,
          strikeOut: false,
          color: '#000000',
        },
        unit: 's',
        autoLimits: true,
        logarithmic: false,
        logSettings: {
          min: 0.1,
          max: 1000000000,
          base: 10,
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
