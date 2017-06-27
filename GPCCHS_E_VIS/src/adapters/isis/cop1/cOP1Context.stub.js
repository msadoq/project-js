// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const _now = require('lodash/now');
const _defaultsDeep = require('lodash/defaultsDeep');
const getCOP1IfAutoState = require('./cOP1IfAutoState.stub');
const getCOP1InternalState = require('./cOP1InternalState.stub');
const getCOP1SentQueue = require('./cOP1SentQueue.stub');
const getCOP1Status = require('./cOP1Status.stub');
const getCOP1WaitQueue = require('./cOP1WaitQueue.stub');
const getGPMCC1State = require('./gPMCC1State.stub');

const now = _now();

const cOP1Context = {
  cop1Status: getCOP1Status(),
  cop1IfAutoState: getCOP1IfAutoState(),
  cop1SentQueue: getCOP1SentQueue(),
  cop1WaitQueue: getCOP1WaitQueue(),
  gpmcc1State: getGPMCC1State(),
  cOP1InternalState: getCOP1InternalState(),
  cLCW_decoder: 1,
  retrans_mode: true,
  initvr_mode: true,
  entityKeyTime: now,
};

module.exports = override => (override ? _defaultsDeep({}, override, cOP1Context) : cOP1Context);
