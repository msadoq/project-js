import simple from '../simpleActionCreator';
import * as types from '../types';

// eslint-disable-next-line import/prefer-default-export
export const updateSessions = simple(types.HSS_UPDATE_SESSIONS, 'sessions');
