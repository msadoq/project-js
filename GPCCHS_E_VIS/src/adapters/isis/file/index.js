// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated file" */
const Collection = require('./collection');
const CollectionDocument = require('./collectionDocument');
const CollectionVirtualFolder = require('./collectionVirtualFolder');
const DocVersion = require('./docVersion');
const Document = require('./document');
const Folder = require('./folder');
const ProfileRight = require('./profileRight');
const UserRight = require('./userRight');

module.exports = {
  Collection: {type: "protobuf", adapter: Collection},
  CollectionDocument: {type: "protobuf", adapter: CollectionDocument},
  CollectionVirtualFolder: {type: "protobuf", adapter: CollectionVirtualFolder},
  DocVersion: {type: "protobuf", adapter: DocVersion},
  Document: {type: "protobuf", adapter: Document},
  Folder: {type: "protobuf", adapter: Folder},
  ProfileRight: {type: "protobuf", adapter: ProfileRight},
  UserRight: {type: "protobuf", adapter: UserRight},
};
