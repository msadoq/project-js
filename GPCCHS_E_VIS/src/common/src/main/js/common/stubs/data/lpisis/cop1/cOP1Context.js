// Produced by Acceleo JavaScript Generator 1.1.0
const _now = require('lodash/now');
const applyOverride = require('../../applyOverride');
const getCOP1IfAutoState = require('./cOP1IfAutoState');
const getCOP1InternalState = require('./cOP1InternalState');
const getCOP1SentQueue = require('./cOP1SentQueue');
const getCOP1Status = require('./cOP1Status');
const getCOP1WaitQueue = require('./cOP1WaitQueue');
const getGPMCC1State = require('./gPMCC1State');

const now = _now();

module.exports = override => applyOverride({
  cop1Status: getCOP1Status(),
  cop1IfAutoState: getCOP1IfAutoState(),
  cop1SentQueue: getCOP1SentQueue(),
  cop1WaitQueue: getCOP1WaitQueue(),
  gpmcc1State: getGPMCC1State(),
  cOP1InternalState: getCOP1InternalState(),
  CLCW_decoder: 1,
  retrans_mode: true,
  initvr_mode: true,
  entityKeyTime: now,
}, override);

