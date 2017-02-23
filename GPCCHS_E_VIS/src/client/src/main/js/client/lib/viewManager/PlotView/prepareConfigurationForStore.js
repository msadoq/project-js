import { v4 } from 'uuid';
import _ from 'lodash/fp';

const indexAxes = _.update('axes', _.indexBy(axis => axis.id || axis.label || v4()));

export default _.pipe(
  indexAxes
);
