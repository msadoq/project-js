import { v4 } from 'uuid';
import _ from 'lodash/fp';

const getDefaultView = _.merge({
  configuration: {
    content: '',
    entryPoints: [],
    dimensions: {
      width: 200,
      height: 200,
    },
  },
  type: 'MimicView',
  defaultRatio: { length: 5, width: 5 },
  links: [],
  title: 'New Mimic View',
  titleStyle: {
    color: '#FFF',
    underline: true,
    bgColor: '#78A155',
    align: 'center',
  },
});

export default _.pipe(
  getDefaultView,
  _.update('configuration.entryPoints', _.map(_.update('id', v4)))
);
