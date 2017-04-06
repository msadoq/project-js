import _ from 'lodash/fp';

export default _.pipe(
  _.update('configuration.axes', _.values)
);
