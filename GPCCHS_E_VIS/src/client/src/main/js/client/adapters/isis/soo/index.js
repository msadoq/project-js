// ====================================================================
// HISTORY
// END-HISTORY
// ====================================================================

// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const GenericOperation = require('./genericOperation');
const Status = require('./status');
const GroupOfOperation = require('./groupOfOperation');
const FunctionalChain = require('./functionalChain');
const Session = require('./session');
const Operation = require('./operation');
const Result = require('./result');

module.exports = {
  GenericOperation: { type: 'protobuf', adapter: GenericOperation },
  Status: { type: 'protobuf', adapter: Status },
  GroupOfOperation: { type: 'protobuf', adapter: GroupOfOperation },
  FunctionalChain: { type: 'protobuf', adapter: FunctionalChain },
  Session: { type: 'protobuf', adapter: Session },
  Operation: { type: 'protobuf', adapter: Operation },
  Result: { type: 'protobuf', adapter: Result },
};
