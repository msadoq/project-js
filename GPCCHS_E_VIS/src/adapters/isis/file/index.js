// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const UserRight = require('./userRight');
const CollectionVirtualFolder = require('./collectionVirtualFolder');
const DocVersion = require('./docVersion');
const ProfileRight = require('./profileRight');
const CollectionDocument = require('./collectionDocument');
const Collection = require('./collection');
const Folder = require('./folder');
const Document = require('./document');

module.exports = {
  UserRight: { type: 'protobuf', adapter: UserRight },
  CollectionVirtualFolder: { type: 'protobuf', adapter: CollectionVirtualFolder },
  DocVersion: { type: 'protobuf', adapter: DocVersion },
  ProfileRight: { type: 'protobuf', adapter: ProfileRight },
  CollectionDocument: { type: 'protobuf', adapter: CollectionDocument },
  Collection: { type: 'protobuf', adapter: Collection },
  Folder: { type: 'protobuf', adapter: Folder },
  Document: { type: 'protobuf', adapter: Document },
};
