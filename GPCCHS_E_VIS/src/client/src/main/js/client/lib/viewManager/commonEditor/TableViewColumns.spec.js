import TimelineField from 'viewManager/commonEditor/TableViewColumns';
import { shallowRenderSnapshot } from 'common/jest/utils';
import stateTest from 'common/jest/stateTest';

const propsStub = {
  onOrderChange: () => null,
};

describe('TableViewColumns :: render', () => {
  test('snapshot', () => {
    shallowRenderSnapshot(TimelineField, propsStub, stateTest);
  });
});
