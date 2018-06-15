import PUS11Modal from 'viewManager/PUS11View/Components/View/PUS11Modal';
import { shallowRenderSnapshot } from 'common/jest/utils';
import stateTest from 'common/jest/stateTest';
import _chunk from 'lodash/chunk';

const propsStub = {
  closeModal: () => null,
  commandsParameters: [
    { name: 'APID_GENE_PARAM', value: 'xxx', description: 'xxx' },
    { name: 'APID_GENE_PARAM', value: 'xxx', description: 'xxx' },
    { name: 'APID_GENE_PARAM', value: 'xxx', description: 'xxx' },
  ],
  timeShifts: [
    { appTime: 1527779682256, shift: 1310 },
    { appTime: 1527779682256, shift: 1310 },
    { appTime: 1527779682256, shift: 1310 },
  ],
  binaryProfile:
    _chunk(
      Buffer.from([
        0xAA, 0x75, 0x66, 0x66, 0x65, 0x72, 0x65, 0x72,
        0xAA, 0x75, 0x66, 0x66, 0x65, 0x72, 0x65, 0x72,
        0xAA, 0x75, 0x66, 0x66, 0x65, 0x72, 0x65, 0x72,
      ], 'hex')
    , 8),
};

describe('PUS11Modal :: render', () => {
  test('snapshot', () => {
    shallowRenderSnapshot(PUS11Modal, propsStub, stateTest);
  });
});

