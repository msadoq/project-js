import PUS05Tab from 'viewManager/PUS05View/Components/Editor/PUS05Tab';
import { shallowRenderSnapshot } from 'common/jest/utils';
import stateTest from 'common/jest/stateTest';

const propsStub = {
  panels: {},
  updateViewPanels: () => {},
  viewId: '1838f507-156b-4734-bf6d-69d0e96b39b8',
};

describe('PUS05Tab :: render', () => {
  test('snapshot', () => {
    shallowRenderSnapshot(PUS05Tab, propsStub, stateTest);
  });
});

