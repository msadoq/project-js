// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const Folder = require('./folder');
const Document = require('./document');
const UserRight = require('./userRight');
const Collection = require('./collection');
const CollectionVirtualFolder = require('./collectionVirtualFolder');
const DocVersion = require('./docVersion');
const CollectionDocument = require('./collectionDocument');

module.exports = {
  Folder: { type: 'protobuf', adapter: Folder },
  Document: { type: 'protobuf', adapter: Document },
  UserRight: { type: 'protobuf', adapter: UserRight },
  Collection: { type: 'protobuf', adapter: Collection },
  CollectionVirtualFolder: { type: 'protobuf', adapter: CollectionVirtualFolder },
  DocVersion: { type: 'protobuf', adapter: DocVersion },
  CollectionDocument: { type: 'protobuf', adapter: CollectionDocument },
};
