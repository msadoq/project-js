import { v4 } from 'uuid';
import _ from 'lodash/fp';

import { moveProp } from 'common/fp';

const singleton = x => [x];

const getDefaultView = _.merge({
  type: 'DynamicView',
  title: 'New DynamicView View',
  links: [],
  defaultRatio: { length: 5, width: 5 },
  configuration: {
    entryPoint: {},
  },
});

export default _.pipe(
  getDefaultView,
  _.update('configuration', _.pipe(
    _.update('entryPoint.id', v4),
    moveProp('entryPoint', 'entryPoints'),
    _.update('entryPoints', singleton)
  ))
);
