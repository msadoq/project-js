// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 23/05/2017 : Move DC stub code in client/lib/stubProcess
// VERSION : 1.1.2 : DM : #5828 : 23/05/2017 : Move data stubs in common/protobuf
// VERSION : 1.1.2 : DM : #5828 : 14/06/2017 : Move common/log and common/parameters in client/
// VERSION : 1.1.2 : FA : #6798 : 22/06/2017 : Remove data from protobuf in client - Change some stubProcesses and some controllers
// END-HISTORY
// ====================================================================

const { join, dirname, basename } = require('path');
const { existsSync } = require('fs');
const { get } = require('../../common/configurationManager');
const stubs = require('../../utils/stubs');

const stubData = stubs.getStubData();

module.exports = function sendFmdGet(queryId, oid, zmq) {
  const buffer = [
    null,
    stubData.getFmdGetDataHeaderProtobuf(),
    stubData.getStringProtobuf(queryId),
    null,
    null,
  ];

  const root = get('ISIS_DOCUMENTS_ROOT');
  const path = oid.replace('oid:', '');
  if (!root) {
    buffer[3] = stubData.getErrorStatusProtobuf();
    buffer[4] = stubData.getStringProtobuf(`Unable to resolve oid ${oid} due to no fmd support`);
  } else if (!existsSync(join(root, path))) {
    buffer[3] = stubData.getErrorStatusProtobuf();
    buffer[4] = stubData.getStringProtobuf(`this file doesn't exist ${path}`);
  } else {
    buffer[3] = stubData.getSuccessStatusProtobuf();
    buffer[4] = stubData.getFMDFileInfoProtobuf();
    buffer[5] = stubData.getDocumentProtobuf({
      dirname: dirname(path),
      basename: basename(path),
    });
  }

  zmq.push('stubData', buffer);
};
