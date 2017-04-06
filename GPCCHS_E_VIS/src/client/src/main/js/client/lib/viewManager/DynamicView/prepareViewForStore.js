import { v4 } from 'uuid';
import _ from 'lodash/fp';

const getDefaultView = _.merge({
  type: 'DynamicView',
  title: 'New DynamicView View',
  links: [],
  defaultRatio: { length: 5, width: 5 },
  configuration: {
    entryPoint: { connectedData: {} },
  },
});

export default _.pipe(
  getDefaultView,
  _.update('configuration.entryPoint.id', v4)
);
