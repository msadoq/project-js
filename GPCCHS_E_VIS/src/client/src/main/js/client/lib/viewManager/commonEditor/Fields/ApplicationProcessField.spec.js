import ApplicationProcessField from 'viewManager/commonEditor/Fields/ApplicationProcessField';
import { REQUESTING } from 'store/reducers/apids';
import { shallowRenderSnapshot } from '../../../common/jest/utils';
import { VM_VIEW_PUS11 } from '../../constants';

const propsStub = {
  apids: [{
    '2-42': [{
      apidName: 'TIMEPACKET',
      apidRawValue: 0,
    }, {
      apidName: 'ATTITUDE',
      apidRawValue: 1,
    }],
  }],
  askApids: () => null,
  pusType: VM_VIEW_PUS11,
};

describe('viewManager :: commonEditor :: Fields :: ApplicationProcessField', () => {
  test('snapshot', () => {
    shallowRenderSnapshot(ApplicationProcessField, propsStub, {});
  });
  test('snapshot 2', () => {
    const propsStub2 = { ...propsStub, apids: REQUESTING };
    shallowRenderSnapshot(ApplicationProcessField, propsStub2, {});
  });
});
