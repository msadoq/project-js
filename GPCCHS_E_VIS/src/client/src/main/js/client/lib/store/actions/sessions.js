import * as types from '../types';
import simple from '../simpleActionCreator';

export default {
  updateSessions: simple(types.HSS_UPDATE_SESSIONS, 'sessions'),
};
