// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const Folder = require('./folder');
const CollectionDocument = require('./collectionDocument');
const DocVersion = require('./docVersion');
const Collection = require('./collection');
const CollectionVirtualFolder = require('./collectionVirtualFolder');
const ProfileRight = require('./profileRight');
const Document = require('./document');
const UserRight = require('./userRight');

module.exports = {
  Folder: { type: 'protobuf', adapter: Folder },
  CollectionDocument: { type: 'protobuf', adapter: CollectionDocument },
  DocVersion: { type: 'protobuf', adapter: DocVersion },
  Collection: { type: 'protobuf', adapter: Collection },
  CollectionVirtualFolder: { type: 'protobuf', adapter: CollectionVirtualFolder },
  ProfileRight: { type: 'protobuf', adapter: ProfileRight },
  Document: { type: 'protobuf', adapter: Document },
  UserRight: { type: 'protobuf', adapter: UserRight },
};
