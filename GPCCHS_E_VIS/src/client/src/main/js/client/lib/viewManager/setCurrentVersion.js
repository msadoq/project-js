import _set from 'lodash/set';
import { get } from 'common/configurationManager';

export default view => _set(view, 'version', get('CURRENT_CONFIG_VERSION'));
