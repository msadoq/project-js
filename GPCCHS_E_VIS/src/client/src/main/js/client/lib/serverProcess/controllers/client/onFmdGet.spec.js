const _concat = require('lodash/concat');
const { decode } = require('common/protobuf');
const globalConstants = require('../../../constants');
const dataStub = require('common/protobuf/stubs');

const onFmdGet = require('./onFmdGet');


let calls = [];
const zmqEmulator = (payload) => {
  calls = _concat(calls, payload);
};

describe('controllers/client/onFmdGet', () => {
  beforeEach(() => {
    calls.length = 0;
  });
  it('works', () => {
    const myQueryId = 'myQueryId';
    const myGetDocumentAction = dataStub.getFMDGet();
    // launch test
    onFmdGet(zmqEmulator, myQueryId, { oid: myGetDocumentAction.serializedOid });
    // check data
    expect(calls).toHaveLength(3);
    expect(calls[0].constructor).toBe(Buffer);
    expect(decode('dc.dataControllerUtils.Header', calls[0]).messageType).toBe(globalConstants.MESSAGETYPE_FMD_GET_QUERY);
    expect(calls[1].constructor).toBe(Buffer);
    expect(decode('dc.dataControllerUtils.String', calls[1]).string).toBe(myQueryId);
    expect(calls[2].constructor).toBe(Buffer);
    expect(decode('dc.dataControllerUtils.FMDGet', calls[2])).toMatchObject({
      serializedOid: myGetDocumentAction.serializedOid,
    });
  });
});
