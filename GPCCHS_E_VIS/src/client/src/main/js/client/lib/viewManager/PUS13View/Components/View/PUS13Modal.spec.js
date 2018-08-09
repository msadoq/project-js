import PUS13Modal from 'viewManager/PUS13View/Components/View/PUS13Modal';
import { shallowRenderSnapshot } from 'common/jest/utils';

const propsStub = {
  closeModal: () => null,
  commandParameters: [
    { name: 'APID_GENE_PARAM', value: 'xxx', description: 'xxx' },
    { name: 'APID_GENE_PARAM', value: 'xxx', description: 'xxx' },
    { name: 'APID_GENE_PARAM', value: 'xxx', description: 'xxx' },
  ],
  ltdDetails: [
    { partID: 100, status: 'DOWNLOADING', partSize: 12305 },
    { partID: 100, status: 'UPLOADING', partSize: 12305 },
    { partID: 100, status: 'ABORTED', partSize: 12305 },
  ],
};

describe('PUS13Modal :: render', () => {
  test('snapshot', () => {
    shallowRenderSnapshot(PUS13Modal, propsStub);
  });
});

