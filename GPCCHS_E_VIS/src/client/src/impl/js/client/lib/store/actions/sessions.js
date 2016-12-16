import * as types from '../types';

// TODO : retrieve sessions list on-demand and session time on realtime jump
export function updateSessions(sessions) { // eslint-disable-line import/prefer-default-export
  // TODO : remove following loop and offsetWithmachineTime key and implement an on-the-fly
  //        getSessionTime() call to DC
  const now = Date.now();
  sessions.map(s => Object.assign(s, { offsetWithmachineTime: s.timestamp.ms - now }));

  return {
    type: types.HSS_UPDATE_SESSIONS,
    payload: {
      sessions,
    }
  };
}
