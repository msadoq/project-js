import simple from '../../helpers/simpleActionCreator';
import * as types from '../../types';

// intervals can be a simple array for 1 interval or an array of arrays for multiple intervals
const sendArchiveQuery =
  simple(types.WS_KNOWN_PUS_INTERVAL_ADD, 'pusService', 'id', 'dataId', 'interval', 'continuous');

export default {
  sendArchiveQuery,
};
