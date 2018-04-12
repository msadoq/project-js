import simple from '../helpers/simpleActionCreator';
import * as types from '../types';

// intervals can be a simple array for 1 interval or an array of arrays for multiple intervals
export const sendArchiveQuerySamplingOn =
  simple(types.WS_KNOWNINTERVAL_ADD_SAMPLING_ON, 'tbdId', 'dataId', 'intervals', 'filters');
export const removeKnownRangesSamplingOn = simple(types.WS_KNOWNINTERVAL_DELETE_SAMPLING_ON, 'tbdId', 'intervals');
export const resetKnownRangeSamplingOn = simple(types.RESET_KNOWN_RANGES_SAMPLING_ON, 'tbdIdInterval');
