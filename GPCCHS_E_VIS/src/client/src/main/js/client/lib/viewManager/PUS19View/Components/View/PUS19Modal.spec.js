import PUS19Modal from 'viewManager/PUS19View/Components/View/PUS19Modal';
import { shallowRenderSnapshot } from 'common/jest/utils';
import _chunk from 'lodash/chunk';

const propsStub = {
  closeModal: () => null,
  binaryProfile: {
    commandBinaryProfile: _chunk(
      Buffer.from([
        0xAA, 0x75, 0x66, 0x66, 0x65, 0x72, 0x65, 0x72,
        0xAA, 0x75, 0x66, 0x66, 0x65, 0x72, 0x65, 0x72,
        0xAA, 0x75, 0x66, 0x66, 0x65, 0x72, 0x65, 0x72,
      ], 'hex')
      , 8),
    lastUpdateModeBinProf: '1',
    lastUpdateTimeBinProf: 1527779682256,
  },
};

describe('PUS19Modal :: render', () => {
  test('snapshot', () => {
    shallowRenderSnapshot(PUS19Modal, propsStub);
  });
});

