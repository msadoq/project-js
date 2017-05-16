// Produced by Acceleo JavaScript Generator 1.1.0
const cOP1IfAutoState = require('./cOP1IfAutoState');
const cOP1InternalState = require('./cOP1InternalState');
const cOP1SentQueue = require('./cOP1SentQueue');
const cOP1Status = require('./cOP1Status');
const cOP1WaitQueue = require('./cOP1WaitQueue');
const decoderType = require('./decoderType');
const gPMCC1State = require('./gPMCC1State');

module.exports = {
  encode: data => ({
    cop1Status: (data.cop1Status !== null && typeof data.cop1Status !== 'undefined')
      ? cOP1Status.encode(data.cop1Status)
      : null,
    cop1IfAutoState: (data.cop1IfAutoState !== null && typeof data.cop1IfAutoState !== 'undefined')
      ? cOP1IfAutoState.encode(data.cop1IfAutoState)
      : null,
    cop1SentQueue: (data.cop1SentQueue !== null && typeof data.cop1SentQueue !== 'undefined')
      ? cOP1SentQueue.encode(data.cop1SentQueue)
      : null,
    cop1WaitQueue: (data.cop1WaitQueue !== null && typeof data.cop1WaitQueue !== 'undefined')
      ? cOP1WaitQueue.encode(data.cop1WaitQueue)
      : null,
    gpmcc1State: (data.gpmcc1State !== null && typeof data.gpmcc1State !== 'undefined')
      ? gPMCC1State.encode(data.gpmcc1State)
      : null,
    cOP1InternalState: (data.cOP1InternalState !== null && typeof data.cOP1InternalState !== 'undefined')
      ? cOP1InternalState.encode(data.cOP1InternalState)
      : null,
    CLCW_decoder: (data.CLCW_decoder !== null && typeof data.CLCW_decoder !== 'undefined')
      ? data.CLCW_decoder
      : null,
    retrans_mode: (data.retrans_mode !== null && typeof data.retrans_mode !== 'undefined')
      ? { value: data.retrans_mode }
      : null,
    initvr_mode: (data.initvr_mode !== null && typeof data.initvr_mode !== 'undefined')
      ? { value: data.initvr_mode }
      : null,
    entityKeyTime: (data.entityKeyTime !== null && typeof data.entityKeyTime !== 'undefined')
      ? { value: data.entityKeyTime }
      : null,
  }),
  decode: data => ({
    cop1Status: (data.cop1Status !== null && typeof data.cop1Status !== 'undefined')
      ? cOP1Status.decode(data.cop1Status)
      : undefined,
    cop1IfAutoState: (data.cop1IfAutoState !== null && typeof data.cop1IfAutoState !== 'undefined')
      ? cOP1IfAutoState.decode(data.cop1IfAutoState)
      : undefined,
    cop1SentQueue: (data.cop1SentQueue !== null && typeof data.cop1SentQueue !== 'undefined')
      ? cOP1SentQueue.decode(data.cop1SentQueue)
      : undefined,
    cop1WaitQueue: (data.cop1WaitQueue !== null && typeof data.cop1WaitQueue !== 'undefined')
      ? cOP1WaitQueue.decode(data.cop1WaitQueue)
      : undefined,
    gpmcc1State: (data.gpmcc1State !== null && typeof data.gpmcc1State !== 'undefined')
      ? gPMCC1State.decode(data.gpmcc1State)
      : undefined,
    cOP1InternalState: (data.cOP1InternalState !== null && typeof data.cOP1InternalState !== 'undefined')
      ? cOP1InternalState.decode(data.cOP1InternalState)
      : undefined,
    CLCW_decoder: (data.CLCW_decoder !== null && typeof data.CLCW_decoder !== 'undefined')
      ? { type: 'enum', value: data.CLCW_decoder, symbol: decoderType[data.CLCW_decoder] }
      : undefined,
    retrans_mode: (data.retrans_mode !== null && typeof data.retrans_mode !== 'undefined')
      ? { type: 'boolean', value: data.retrans_mode.value }
      : undefined,
    initvr_mode: (data.initvr_mode !== null && typeof data.initvr_mode !== 'undefined')
      ? { type: 'boolean', value: data.initvr_mode.value }
      : undefined,
    entityKeyTime: (data.entityKeyTime !== null && typeof data.entityKeyTime !== 'undefined')
      ? { type: 'time', value: data.entityKeyTime.value.toNumber() }
      : undefined,
    referenceTimestamp: (data.entityKeyTime !== null && typeof data.entityKeyTime !== 'undefined')
        ? { type: 'time', value: data.entityKeyTime.value.toNumber() }
        : undefined,
  }),
};

