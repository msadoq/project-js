import _ from 'lodash/fp';
import { v4 } from 'uuid';

const getDefaultView = _.merge({
  type: 'HistoryView',
  defaultRatio: { length: 5, width: 5 },
  links: [],
  title: 'New History View',
  configuration: {
    entryPoints: [],
    allColumns: {},
    sorting: {},
    hiddenColumns: {},
  },
});

export default _.pipe(
    getDefaultView,
    _.update('configuration.entryPoints', _.map(_.update('id', v4)))
);
