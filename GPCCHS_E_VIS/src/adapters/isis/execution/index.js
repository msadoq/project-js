// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const CodedExecutionStrategy = require('./codedExecutionStrategy');
const Execution = require('./execution');
const BreakPoint = require('./breakPoint');
const ExecutionStatus = require('./executionStatus');

module.exports = {
  CodedExecutionStrategy: { type: 'raw', adapter: CodedExecutionStrategy },
  Execution: { type: 'protobuf', adapter: Execution },
  BreakPoint: { type: 'raw', adapter: BreakPoint },
  ExecutionStatus: { type: 'raw', adapter: ExecutionStatus },
};
