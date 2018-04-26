import simple from '../helpers/simpleActionCreator';
import * as types from '../types';

export const sendArchiveQuery =
  simple(types.WS_EVENT_ADD, 'dataId', 'parameterName', 'eventDate');
export const removeEvents = simple(types.WS_EVENT_DELETE, 'eventCategory', 'eventType', 'tuple', 'parameterName', 'interval');
