const { join, dirname, basename } = require('path');
const { existsSync } = require('fs');
const { get } = require('../../parameters');
const stubData = require('../data');

module.exports = function sendFmdGet(queryId, oid, zmq) {
  const buffer = [
    null,
    stubData.getFmdGetDataHeaderProtobuf(),
    stubData.getStringProtobuf(queryId),
    null,
    null,
  ];

  const path = oid.replace('oid:', '');
  if (!existsSync(join(get('FMD_ROOT_DIR'), path))) {
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
