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
const constants = require('../../constants');

const stubData = stubs.getStubData();

const V1 = (queryId, oid) => {
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

  return buffer;
};

const V2 = (queryId, oid, rawBuffer) => {
  const buffer = [];
  const root = get('ISIS_DOCUMENTS_ROOT');
  const path = oid.replace('oid:', '');
  buffer.push(null);
  if (!root) {
    buffer.push(stubData.getFmdGetDataHeaderProtobufADE(queryId, false, true));
    buffer.push(stubData.getADEErrorProtobuf({ code: 0, message: `Unable to resolve oid ${oid} due to no fmd support` }));
  } else if (!existsSync(join(root, path))) {
    buffer.push(stubData.getFmdGetDataHeaderProtobufADE(queryId, false, true));
    buffer.push(stubData.getADEErrorProtobuf({ code: 0, message: `this file doesn't exist ${path}` }));
  } else {
    buffer.push(stubData.getFmdGetDataHeaderProtobufADE(queryId, false, false));
    buffer.push(rawBuffer);
    buffer.push(stubData.getFMDFileInfoProtobuf());
    buffer.push(stubData.getDocumentProtobuf({
      dirname: dirname(path),
      basename: basename(path),
    }));
  }

  return buffer;
};

const versionDCMap = {
  [constants.DC_COM_V1]: V1,
  [constants.DC_COM_V2]: V2,
};

module.exports = function sendFmdGet(queryId, rawBuffer, oid, zmq, versionDCCom) {
  const buffer = versionDCMap[versionDCCom](queryId, oid, rawBuffer);
  zmq.push('stubData', buffer);
};
