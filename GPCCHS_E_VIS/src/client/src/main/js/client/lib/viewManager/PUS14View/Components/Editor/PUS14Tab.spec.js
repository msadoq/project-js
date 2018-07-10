import PUS14Tab from 'viewManager/PUS14View/Components/Editor/PUS14Tab';
import { shallowRenderSnapshot } from 'common/jest/utils';
import stateTest from 'common/jest/stateTest';

const propsStub = {
  panels: {},
  updateViewPanels: () => {},
  viewId: '1838f507-156b-4734-bf6d-69d0e96b39b8',
};

describe('PUS14Tab :: render', () => {
  test('snapshot', () => {
    shallowRenderSnapshot(PUS14Tab, propsStub, stateTest);
  });
});

