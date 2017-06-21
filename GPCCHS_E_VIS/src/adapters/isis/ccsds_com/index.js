// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ObjectDetails = require('./objectDetails');
const ObjectType = require('./objectType');
const ObjectId = require('./objectId');
const ObjectKey = require('./objectKey');
const InstanceBooleanPair = require('./instanceBooleanPair');
const ArchiveQuery = require('./archiveQuery');
const CompositeFilterSet = require('./compositeFilterSet');
const ArchiveDetails = require('./archiveDetails');
const CompositeFilter = require('./compositeFilter');

module.exports = {
  ObjectDetails: { type: 'raw', adapter: ObjectDetails },
  ObjectType: { type: 'raw', adapter: ObjectType },
  ObjectId: { type: 'raw', adapter: ObjectId },
  ObjectKey: { type: 'raw', adapter: ObjectKey },
  InstanceBooleanPair: { type: 'raw', adapter: InstanceBooleanPair },
  ArchiveQuery: { type: 'raw', adapter: ArchiveQuery },
  CompositeFilterSet: { type: 'protobuf', adapter: CompositeFilterSet },
  ArchiveDetails: { type: 'raw', adapter: ArchiveDetails },
  CompositeFilter: { type: 'protobuf', adapter: CompositeFilter },
};
