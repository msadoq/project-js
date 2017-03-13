import { v4 } from 'uuid';
import _ from 'lodash/fp';

const getDefaultConfiguration = _.defaults({
  type: 'DynamicView',
  defaultRatio: { length: 5, width: 5 },
  entryPoint: { connectedData: {} },
  links: [],
  title: 'New DynamicView View',
});

export default _.pipe(
  getDefaultConfiguration,
  _.update('entryPoint.id', v4)
);
