import simple from '../simpleActionCreator';
import * as types from '../types';

/**
 * Simple actions
 */
const updateStatus = simple(types.HSC_UPDATE_STATUS, 'status');
export default updateStatus;
