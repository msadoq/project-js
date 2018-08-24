import { shallowRenderSnapshot } from 'common/jest/utils';
import stateTest from 'common/jest/stateTest';
import ApidStatusHeader from 'viewManager/common/Components/View/PUS/ApidStatusHeader';

const propsStub = {
  status: 'ENABLED',
  lastUpdateMode: 'TM',
  lastUpdateTime: '1532941906431',
  label: 'Service Status',
};

describe('viewManager/common/Components/View/PUS/HeaderStatus', () => {
  describe('HeaderStatus :: render', () => {
    test('snapshot enabled', () => {
      shallowRenderSnapshot(ApidStatusHeader, propsStub, stateTest);
    });
    test('snapshot disabled', () => {
      shallowRenderSnapshot(ApidStatusHeader, {
        ...propsStub,
        status: 'DISABLED',
      }, stateTest);
    });
  });
});
