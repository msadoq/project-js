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

  const createPath = join(get('FMD_ROOT_DIR'), path, name);
  if (existsSync(createPath)) {
    buffer[3] = stubData.getErrorStatusProtobuf();
    buffer[4] = stubData.getStringProtobuf(`this file already exists: ${createPath}`);
  } else {
    writeFileSync(createPath, '', 'utf8');
    buffer[3] = stubData.getSuccessStatusProtobuf();
    buffer[4] = stubData.getFMDFileInfoProtobuf();
  }

  zmq.push('stubData', buffer);
};
