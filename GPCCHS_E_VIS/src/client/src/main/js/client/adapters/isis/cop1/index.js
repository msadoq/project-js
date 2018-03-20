// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const COP1IfAutoState = require('./cOP1IfAutoState');
const COP1InternalState = require('./cOP1InternalState');
const FlagVal = require('./flagVal');
const COP1Context = require('./cOP1Context');
const SentQueueElement = require('./sentQueueElement');
const COP1WaitQueue = require('./cOP1WaitQueue');
const GPMCC1State = require('./gPMCC1State');
const COP1Directive = require('./cOP1Directive');
const COP1SentQueue = require('./cOP1SentQueue');
const IfQueueUnit = require('./ifQueueUnit');
const ClcwSegmentMask = require('./clcwSegmentMask');
const COP1Status = require('./cOP1Status');
const IfQueueElement = require('./ifQueueElement');
const ProccessedTC = require('./proccessedTC');

module.exports = {
  COP1IfAutoState: { type: 'protobuf', adapter: COP1IfAutoState },
  COP1InternalState: { type: 'protobuf', adapter: COP1InternalState },
  FlagVal: { type: 'protobuf', adapter: FlagVal },
  COP1Context: { type: 'protobuf', adapter: COP1Context },
  SentQueueElement: { type: 'protobuf', adapter: SentQueueElement },
  COP1WaitQueue: { type: 'protobuf', adapter: COP1WaitQueue },
  GPMCC1State: { type: 'protobuf', adapter: GPMCC1State },
  COP1Directive: { type: 'protobuf', adapter: COP1Directive },
  COP1SentQueue: { type: 'protobuf', adapter: COP1SentQueue },
  IfQueueUnit: { type: 'protobuf', adapter: IfQueueUnit },
  ClcwSegmentMask: { type: 'protobuf', adapter: ClcwSegmentMask },
  COP1Status: { type: 'protobuf', adapter: COP1Status },
  IfQueueElement: { type: 'protobuf', adapter: IfQueueElement },
  ProccessedTC: { type: 'protobuf', adapter: ProccessedTC },
};
