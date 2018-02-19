import TimelineField from 'viewManager/commonEditor/Fields/TimelineField';
import { shallowRenderSnapshot } from 'common/jest/utils';

const propsStub = {
  timelineName: 'timeline',
  timelines: [{
    name: 'timeline',
    items: [],
  }],
  onChange: () => {},
};

describe('TimelineField :: render', () => {
  test('snapshot', () => {
    shallowRenderSnapshot(TimelineField, propsStub, {});
  });
});

