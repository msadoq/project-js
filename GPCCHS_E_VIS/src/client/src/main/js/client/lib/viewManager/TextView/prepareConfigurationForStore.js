import _ from 'lodash/fp';

const getDefaultConfiguration = _.defaults({
  type: 'TextView',
  content: '',
  defaultRatio: { length: 5, width: 5 },
  entryPoints: [],
  links: [],
  title: 'New Text View',
});

export default _.pipe(
  getDefaultConfiguration
);
