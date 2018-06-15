import PUS05Modal from 'viewManager/PUS05View/Components/View/PUS05Modal';
import { shallowRenderSnapshot } from 'common/jest/utils';
import stateTest from 'common/jest/stateTest';

const propsStub = {
  closeModal: () => null,
  parameters: [
    { label: 'APID_GENE_PARAM', value: 'xxx' },
    { label: 'APID_GENE_PARAM', value: 'xxx' },
    { label: 'APID_GENE_PARAM', value: 'xxx' },
    { label: 'APID_GENE_PARAM', value: 'xxx' },
    { label: 'APID_GENE_PARAM', value: 'xxx' },
    { label: 'APID_GENE_PARAM', value: 'xxx' },
    { label: 'APID_GENE_PARAM', value: 'xxx' },
    { label: 'APID_GENE_PARAM', value: 'xxx' },
    { label: 'APID_GENE_PARAM', value: 'xxx' },
    { label: 'APID_GENE_PARAM', value: 'xxx' },
  ],
};

describe('PUS05Modal :: render', () => {
  test('snapshot', () => {
    shallowRenderSnapshot(PUS05Modal, propsStub, stateTest);
  });
});

