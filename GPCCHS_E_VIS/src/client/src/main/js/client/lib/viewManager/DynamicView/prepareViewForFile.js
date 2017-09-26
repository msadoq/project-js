// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 05/04/2017 : Rename all prepareConfiguration* in prepareView* in viewManager
// VERSION : 1.1.2 : DM : #5828 : 06/04/2017 : Change prepareViewFor* behaviors . .
// VERSION : 1.1.2 : DM : #5828 : 13/06/2017 : Move few common/ modules in client/ folder
// END-HISTORY
// ====================================================================

import _ from 'lodash/fp';
import { copyProp } from '../../common/fp';

const keepFirstEntryPoint = _.pipe(
  copyProp('entryPoints[0]', 'entryPoint'),
  _.unset('entryPoints')
);

export default _.pipe(
  _.update('configuration', keepFirstEntryPoint)
);
