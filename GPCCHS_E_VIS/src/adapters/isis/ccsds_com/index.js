// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ObjectKey = require('./objectKey');
const InstanceBooleanPair = require('./instanceBooleanPair');
const ObjectId = require('./objectId');
const ObjectDetails = require('./objectDetails');
const ObjectType = require('./objectType');
const ArchiveDetails = require('./archiveDetails');
const CompositeFilter = require('./compositeFilter');
const CompositeFilterSet = require('./compositeFilterSet');
const ArchiveQuery = require('./archiveQuery');

module.exports = {
  ObjectKey: { type: 'raw', adapter: ObjectKey },
  InstanceBooleanPair: { type: 'raw', adapter: InstanceBooleanPair },
  ObjectId: { type: 'raw', adapter: ObjectId },
  ObjectDetails: { type: 'raw', adapter: ObjectDetails },
  ObjectType: { type: 'raw', adapter: ObjectType },
  ArchiveDetails: { type: 'raw', adapter: ArchiveDetails },
  CompositeFilter: { type: 'protobuf', adapter: CompositeFilter },
  CompositeFilterSet: { type: 'protobuf', adapter: CompositeFilterSet },
  ArchiveQuery: { type: 'raw', adapter: ArchiveQuery },
};
