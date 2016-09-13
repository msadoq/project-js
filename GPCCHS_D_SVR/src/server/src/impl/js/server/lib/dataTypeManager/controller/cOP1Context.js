const JS = require('../protoFile/cOP1Context.proto.js');
const { getAttributeValue } = require('../lib/utils.js');

const COP1Context = JS.COP1Context;

exports.binToJson = (payload) => {
  const decoded = COP1Context.decode(payload);
  const cOP1Context = {
    cop1Status: decoded.cop1Status.value,    cop1IfAutoState: decoded.cop1IfAutoState.value,    cop1SentQueue: decoded.cop1SentQueue.value,    cop1WaitQueue: decoded.cop1WaitQueue.value,    gpmcc1State: decoded.gpmcc1State.value,    cOP1InternalState: decoded.cOP1InternalState.value,    CLCW_decoder: decoded.CLCW_decoder,    retrans_mode: decoded.retrans_mode.value,    initvr_mode: decoded.initvr_mode.value
  };
  return cOP1Context;
};
