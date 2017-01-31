import simple from '../simpleActionCreator';
import * as types from '../types';

// eslint-disable-next-line import/prefer-default-export
export const updateMasterSession = simple(types.HSS_UPDATE_MASTER_SESSION, 'masterSessionOid');
