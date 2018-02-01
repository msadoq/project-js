// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 23/05/2017 : Move DC stub code in client/lib/stubProcess
// VERSION : 1.1.2 : DM : #5828 : 23/05/2017 : Move data stubs in common/protobuf
// VERSION : 1.1.2 : DM : #5828 : 14/06/2017 : Move common/log and common/parameters in client/
// VERSION : 1.1.2 : FA : #6798 : 22/06/2017 : Remove data from protobuf in client - Change some stubProcesses and some controllers
// END-HISTORY
// ====================================================================

const { join } = require('path');
const { existsSync, writeFileSync } = require('fs');
const { get } = require('../../common/configurationManager');
const stubs = require('../../utils/stubs');

const stubData = stubs.getStubData();

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
