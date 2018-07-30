import { shallowRenderSnapshot } from 'common/jest/utils';
import stateTest from 'common/jest/stateTest';
import HeaderStatus from 'viewManager/common/Components/View/PUS/HeaderStatus';

const propsStub = {
  status: 'ENABLED',
  lastUpdateMode: 'TM',
  lastUpdateTime: '1532941906431',
  label: 'Service Status',
};

describe('viewManager/common/Components/View/PUS/HeaderStatus', () => {
  describe('HeaderStatus :: render', () => {
    test('snapshot enabled', () => {
      shallowRenderSnapshot(HeaderStatus, propsStub, stateTest);
    });
    test('snapshot disabled', () => {
      shallowRenderSnapshot(HeaderStatus, {
        ...propsStub,
        status: 'DISABLED',
      }, stateTest);
    });
  });
});
