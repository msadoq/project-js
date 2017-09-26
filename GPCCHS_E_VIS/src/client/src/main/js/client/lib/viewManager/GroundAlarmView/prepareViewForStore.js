import _ from 'lodash/fp';

const getDefaultView = _.merge({
  type: 'SkeletonView',
  defaultRatio: { length: 5, width: 5 },
  links: [],
  title: 'New Skeleton View',
  configuration: {
    entryPoints: [],
  },
});

export default _.pipe(
    getDefaultView
);
