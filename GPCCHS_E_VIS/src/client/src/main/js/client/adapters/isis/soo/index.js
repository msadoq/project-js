// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const GroupOfOperation = require('./groupOfOperation');
const SooBreakpoint = require('./sooBreakpoint');
const Status = require('./status');
const Operation = require('./operation');
const SooState = require('./sooState');
const SooFunctionalChain = require('./sooFunctionalChain');
const Session = require('./session');
const SooOperation = require('./sooOperation');
const Result = require('./result');
const FunctionalChain = require('./functionalChain');
const SooDependency = require('./sooDependency');
const GenericOperation = require('./genericOperation');
const SooOperationState = require('./sooOperationState');

module.exports = {
  GroupOfOperation: { type: 'protobuf', adapter: GroupOfOperation },
  SooBreakpoint: { type: 'protobuf', adapter: SooBreakpoint },
  Operation: { type: 'protobuf', adapter: Operation },
  SooState: { type: 'protobuf', adapter: SooState },
  SooFunctionalChain: { type: 'protobuf', adapter: SooFunctionalChain },
  Session: { type: 'protobuf', adapter: Session },
  SooOperation: { type: 'protobuf', adapter: SooOperation },
  Result: { type: 'raw', adapter: Result },
  FunctionalChain: { type: 'raw', adapter: FunctionalChain },
  SooDependency: { type: 'protobuf', adapter: SooDependency },
  GenericOperation: { type: 'protobuf', adapter: GenericOperation },
  SooOperationState: { type: 'protobuf', adapter: SooOperationState },
};
