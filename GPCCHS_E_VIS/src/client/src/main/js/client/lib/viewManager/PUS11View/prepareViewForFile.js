import _ from 'lodash/fp';
import { copyProp } from 'common/fp';

const keepFirstEntryPoint = _.pipe(
  copyProp('entryPoints[0]', 'entryPoint'),
  _.unset('entryPoints')
);

export default _.pipe(
  _.update('configuration', keepFirstEntryPoint)
);
