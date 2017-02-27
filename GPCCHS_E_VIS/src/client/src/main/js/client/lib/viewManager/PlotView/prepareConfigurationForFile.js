import _ from 'lodash/fp';

export default _.pipe(
  _.update('axes', _.values)
);
