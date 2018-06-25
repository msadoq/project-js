// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const Execution = require('./execution');
const BreakPoint = require('./breakPoint');
const CodedExecutionStrategy = require('./codedExecutionStrategy');
const ExecutionStatus = require('./executionStatus');

module.exports = {
  Execution: { type: 'protobuf', adapter: Execution },
  BreakPoint: { type: 'raw', adapter: BreakPoint },
  CodedExecutionStrategy: { type: 'raw', adapter: CodedExecutionStrategy },
  ExecutionStatus: { type: 'raw', adapter: ExecutionStatus },
};
