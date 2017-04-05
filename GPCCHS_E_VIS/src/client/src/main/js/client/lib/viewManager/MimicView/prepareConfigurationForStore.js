import { v4 } from 'uuid';
import _ from 'lodash/fp';

const getDefaultConfiguration = _.defaults({
  content: '',
  entryPoints: [],
});

export default _.pipe(
  getDefaultConfiguration,
  _.update('entryPoints', _.map(_.update('id', v4)))
);
