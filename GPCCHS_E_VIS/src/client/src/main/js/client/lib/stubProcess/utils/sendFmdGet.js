const { join, dirname, basename } = require('path');
const { existsSync } = require('fs');
const { get } = require('common/parameters');
const stubData = require('common/stubs/data');

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
