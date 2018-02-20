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
const constants = require('../../constants');

const V1 = (queryId, path, name) => {
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

  return buffer;
};

const V2 = (queryId, path, name, rawBuffer) => {
  const buffer = [];
  const fullPath = join(path, name);
  const createPath = join(get('ISIS_DOCUMENTS_ROOT'), fullPath);
  if (existsSync(createPath)) {
    buffer.push(null);
    buffer.push(stubData.getFmdCreateDataHeaderProtobufADE(queryId, false, true));
    // buffer.push(rawBuffer);
    // buffer[3] = stubData.getErrorStatusProtobuf();
    buffer.push(stubData.getADEErrorProtobuf({ code: 0, message: `this file already exists: ${createPath}` }));
  } else {
    writeFileSync(createPath, '', 'utf8');
    buffer.push(null);
    buffer.push(stubData.getFmdCreateDataHeaderProtobufADE(queryId, false, false));
    buffer.push(rawBuffer);
    buffer.push(stubData.getFMDFileInfoProtobuf({
      serializedOid: `oid:${fullPath}`,
    }));
  }

  return buffer;
};

const versionDCMap = {
  [constants.DC_COM_V1]: V1,
  [constants.DC_COM_V2]: V2,
};

module.exports = function sendFmdCreate(queryId, rawBuffer, { name, path }, zmq, versionDCCom) {
  const buffer = versionDCMap[versionDCCom](queryId, path, name, rawBuffer);
  zmq.push('stubData', buffer);
};
