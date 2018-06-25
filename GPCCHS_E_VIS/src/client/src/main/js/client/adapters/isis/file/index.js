// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const Collection = require('./collection');
const UserRight = require('./userRight');
const DocVersion = require('./docVersion');
const CollectionVirtualFolder = require('./collectionVirtualFolder');
const CompareDiffParameter = require('./compareDiffParameter');
const Document = require('./document');
const Folder = require('./folder');
const CollectionDocument = require('./collectionDocument');
const CompareDiff = require('./compareDiff');

module.exports = {
  Collection: { type: 'protobuf', adapter: Collection },
  UserRight: { type: 'protobuf', adapter: UserRight },
  DocVersion: { type: 'protobuf', adapter: DocVersion },
  CollectionVirtualFolder: { type: 'protobuf', adapter: CollectionVirtualFolder },
  CompareDiffParameter: { type: 'protobuf', adapter: CompareDiffParameter },
  Document: { type: 'protobuf', adapter: Document },
  Folder: { type: 'protobuf', adapter: Folder },
  CollectionDocument: { type: 'protobuf', adapter: CollectionDocument },
  CompareDiff: { type: 'protobuf', adapter: CompareDiff },
};
