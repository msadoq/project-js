// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const bOOLEAN = require('../ccsds_mal/bOOLEAN');
const cOP1IfAutoState = require('./cOP1IfAutoState');
const cOP1InternalState = require('./cOP1InternalState');
const cOP1SentQueue = require('./cOP1SentQueue');
const cOP1Status = require('./cOP1Status');
const cOP1WaitQueue = require('./cOP1WaitQueue');
const decoderType = require('./decoderType');
const gPMCC1State = require('./gPMCC1State');
const tIME = require('../ccsds_mal/tIME');

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
    cLCW_decoder: (data.cLCW_decoder !== null && typeof data.cLCW_decoder !== 'undefined')
      ? data.cLCW_decoder
      : null,
    retrans_mode: (data.retrans_mode !== null && typeof data.retrans_mode !== 'undefined')
      ? bOOLEAN.encode(data.retrans_mode)
      : null,
    initvr_mode: (data.initvr_mode !== null && typeof data.initvr_mode !== 'undefined')
      ? bOOLEAN.encode(data.initvr_mode)
      : null,
    entityKeyTime: (data.entityKeyTime !== null && typeof data.entityKeyTime !== 'undefined')
      ? tIME.encode(data.entityKeyTime)
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
    cLCW_decoder: (data.cLCW_decoder !== null && typeof data.cLCW_decoder !== 'undefined')
      ? { type: 'enum', value: data.cLCW_decoder, symbol: decoderType[data.cLCW_decoder] }
      : undefined,
    retrans_mode: (data.retrans_mode !== null && typeof data.retrans_mode !== 'undefined')
      ? bOOLEAN.decode(data.retrans_mode)
      : undefined,
    initvr_mode: (data.initvr_mode !== null && typeof data.initvr_mode !== 'undefined')
      ? bOOLEAN.decode(data.initvr_mode)
      : undefined,
    entityKeyTime: (data.entityKeyTime !== null && typeof data.entityKeyTime !== 'undefined')
      ? tIME.decode(data.entityKeyTime)
      : undefined,
    referenceTimestamp: (data.entityKeyTime !== null && typeof data.entityKeyTime !== 'undefined')
        ? { type: 'time', value: data.entityKeyTime.value.toNumber() }
        : undefined,
  }),
};
