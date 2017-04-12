import _ from 'lodash/fp';

const getDefaultView = _.merge({
  type: 'HistoryView',
  defaultRatio: { length: 5, width: 5 },
  links: [],
  title: 'New History View',
  configuration: {
    entryPoints: [],
  },
});

export default _.pipe(
    getDefaultView
);
