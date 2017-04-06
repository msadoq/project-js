import { v4 } from 'uuid';
import _ from 'lodash/fp';

const getDefaultView = _.merge({
  type: 'TextView',
  defaultRatio: { length: 5, width: 5 },
  links: [],
  title: 'New Text View',
  configuration: {
    content: '',
    entryPoints: [],
  },
});

export default _.pipe(
    getDefaultView,
    _.update('configuration.entryPoints', _.map(_.update('id', v4)))
);
