import simple from '../simpleActionCreator';
import * as types from '../types';

/**
 * Simple actions
 */
const updateDomains = simple(types.HSS_UPDATE_DOMAINS, 'domains');
export default updateDomains;
