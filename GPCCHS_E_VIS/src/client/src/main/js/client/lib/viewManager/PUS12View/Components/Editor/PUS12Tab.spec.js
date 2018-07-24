import PUS12Tab from 'viewManager/PUS12View/Components/Editor/PUS12Tab';
import { shallowRenderSnapshot } from 'common/jest/utils';
import stateTest from 'common/jest/stateTest';

const propsStub = {
  panels: {},
  updateViewPanels: () => {},
  viewId: '1838f507-156b-4734-bf6d-69d0e96b39b8',
};

describe('PUS12Tab :: render', () => {
  test('snapshot', () => {
    shallowRenderSnapshot(PUS12Tab, propsStub, stateTest);
  });
});

