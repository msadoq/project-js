// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const Execution = require('./execution');
const ExecutionStatus = require('./executionStatus');
const CodedExecutionStrategy = require('./codedExecutionStrategy');
const BreakPoint = require('./breakPoint');

module.exports = {
  Execution: { type: 'protobuf', adapter: Execution },
  ExecutionStatus: { type: 'raw', adapter: ExecutionStatus },
  CodedExecutionStrategy: { type: 'raw', adapter: CodedExecutionStrategy },
  BreakPoint: { type: 'raw', adapter: BreakPoint },
};
