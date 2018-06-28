// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ObjectKey = require('./objectKey');
const InstanceBooleanPair = require('./instanceBooleanPair');
const ObjectDetails = require('./objectDetails');
const ObjectId = require('./objectId');
const ObjectType = require('./objectType');
const CompositeFilterSet = require('./compositeFilterSet');
const ArchiveQuery = require('./archiveQuery');
const ArchiveDetails = require('./archiveDetails');
const CompositeFilter = require('./compositeFilter');

module.exports = {
  ObjectKey: { type: 'raw', adapter: ObjectKey },
  InstanceBooleanPair: { type: 'raw', adapter: InstanceBooleanPair },
  ObjectDetails: { type: 'raw', adapter: ObjectDetails },
  ObjectId: { type: 'raw', adapter: ObjectId },
  ObjectType: { type: 'raw', adapter: ObjectType },
  CompositeFilterSet: { type: 'protobuf', adapter: CompositeFilterSet },
  ArchiveQuery: { type: 'raw', adapter: ArchiveQuery },
  ArchiveDetails: { type: 'raw', adapter: ArchiveDetails },
  CompositeFilter: { type: 'protobuf', adapter: CompositeFilter },
};
