const { join } = require('path');
const { existsSync, writeFileSync } = require('fs');
const { get } = require('../../parameters');
const stubData = require('../data');

module.exports = function sendFmdCreate(queryId, { name, path }, zmq) {
  const buffer = [
    null,
    stubData.getFmdCreateDataHeaderProtobuf(),
    stubData.getStringProtobuf(queryId),
    null,
    null,
  ];

  const fullPath = join(path, name);
  const createPath = join(get('ISIS_DOCUMENTS_ROOT'), fullPath);
  if (existsSync(createPath)) {
    buffer[3] = stubData.getErrorStatusProtobuf();
    buffer[4] = stubData.getStringProtobuf(`this file already exists: ${createPath}`);
  } else {
    writeFileSync(createPath, '', 'utf8');
    buffer[3] = stubData.getSuccessStatusProtobuf();
    buffer[4] = stubData.getFMDFileInfoProtobuf({
      serializedOid: `oid:${fullPath}`,
    });
  }

  zmq.push('stubData', buffer);
};
//
// module.exports = function sendFmdGet(queryId, oid, zmq) {
//   const buffer = [
//     null,
//     stubData.getFmdGetDataHeaderProtobuf(),
//     stubData.getStringProtobuf(queryId),
//     null,
//     null,
//   ];
//
//   const path = oid.replace('oid:', '');
//   if (!existsSync(join(get('ISIS_DOCUMENTS_ROOT'), path))) {
//     buffer[3] = stubData.getErrorStatusProtobuf();
//     buffer[4] = stubData.getStringProtobuf(`this file doesn't exist ${path}`);
//   } else {
//     buffer[3] = stubData.getSuccessStatusProtobuf();
//     buffer[4] = stubData.getFMDFileInfoProtobuf();
//     buffer[5] = stubData.getDocumentProtobuf({
//       dirname: dirname(path),
//       basename: basename(path),
//     });
//   }
//
//   zmq.push('stubData', buffer);
// };
