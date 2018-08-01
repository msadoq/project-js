import PUS13Tab from 'viewManager/PUS13View/Components/Editor/PUS13Tab';
import { shallowRenderSnapshot } from 'common/jest/utils';
import stateTest from 'common/jest/stateTest';

const propsStub = {
  panels: {},
  updateViewPanels: () => {},
  viewId: '1838f507-156b-4734-bf6d-69d0e96b39b8',
};

describe('PUS13Tab :: render', () => {
  test('snapshot', () => {
    shallowRenderSnapshot(PUS13Tab, propsStub, stateTest);
  });
});

