const _concat = require('lodash/concat');
const { decode } = require('../../../utils/adapters');
const globalConstants = require('../../../constants');
const { registerProtobuf } = require('../../../common/jest');

registerProtobuf();

const dataStub = require('common/protobuf/stubs');

const onFmdCreate = require('./onFmdCreate');

let calls = [];
const zmqEmulator = (payload) => {
  calls = _concat(calls, payload);
};

describe('controllers/client/onFmdCreate', () => {
  beforeEach(() => {
    calls.length = 0;
  });
  test('works', () => {
    const myQueryId = 'myQueryId';
    const myCreateDocumentAction = dataStub.getFMDCreateDocument();
    // launch test
    onFmdCreate(zmqEmulator, myQueryId, myCreateDocumentAction);
    // check data
    expect(calls).toHaveLength(3);
    expect(calls[0].constructor).toBe(Buffer);
    expect(decode('dc.dataControllerUtils.Header', calls[0]).messageType).toBe(globalConstants.MESSAGETYPE_FMD_CREATE_DOCUMENT_QUERY);
    expect(calls[1].constructor).toBe(Buffer);
    expect(decode('dc.dataControllerUtils.String', calls[1]).string).toBe(myQueryId);
    expect(calls[2].constructor).toBe(Buffer);
    expect(decode('dc.dataControllerUtils.FMDCreateDocument', calls[2])).toMatchObject({
      name: myCreateDocumentAction.name,
      path: myCreateDocumentAction.path,
      mimeType: myCreateDocumentAction.mimeType,
    });
  });
});
