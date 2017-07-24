import * as types from '../../types';
// import { addRecords } from '../../../serverProcess/models/lokiKnownRangesData';
// import { injectData } from '../../actions/incomingData';

const prepareRange = () => ({ dispatch }) => next => (action) => { // eslint-disable-line
  if (action.type === types.INCOMING_RANGE_DATA) {
    console.log('[PrepareRangeMiddleware] ON_INCOMING_RANGE_DATA action');
    // const tbdId = action.payload.tbdId;
    // const peers = action.payload.peers;

    // DECODE RANGE
    // const decodedData = proto.decode(peers)

    // ADD DATA IN LOKIs
    // addRecords(tbdId, peersDecodedInterval)

    // EXTRACT DATA TO DISPLAY
    // const displayedData = extractDisplayedData(tbdId, intervals, dataMap);
    // dispatch(injectData(tbdId, displayedData));
  }

  /**
   * Get currently displayed data on the VIMA from the decoded data
   * @param string tbdId
   * @param Array<interval> intervals List of intervals received from the TBD
   * @param Object dataMap The current DataMap
   */
  const extractDisplayedData = (tbdId, intervals, dataMap) => {
    const displayedData = 'displayed data';
    // TODO
    // Algorithm to get a subset of intervals from the comparison of decodedData with the dataMap

    return displayedData;
  };
  return next(action);
};

export default prepareRange;
