import _unset from 'lodash/fp/unset';
import _update from 'lodash/fp/update';
import _pipe from 'lodash/fp/pipe';
import { copyProp } from 'common/fp';

const keepFirstEntryPoint = _pipe(
  copyProp('entryPoints[0]', 'entryPoint'),
  _unset('entryPoints')
);

export default _pipe(
  _update('configuration', keepFirstEntryPoint)
);
