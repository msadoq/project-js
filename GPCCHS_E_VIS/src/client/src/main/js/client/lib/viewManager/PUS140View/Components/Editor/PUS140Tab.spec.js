import PUS140Tab from 'viewManager/PUS140View/Components/Editor/PUS140Tab';
import { shallowRenderSnapshot } from 'common/jest/utils';
import stateTest from 'common/jest/stateTest';

const propsStub = {
  panels: {},
  updateViewPanels: () => {},
  viewId: '1838f507-156b-4734-bf6d-69d0e96b39b8',
};

describe('PUS140Tab :: render', () => {
  test('snapshot', () => {
    shallowRenderSnapshot(PUS140Tab, propsStub, stateTest);
  });
});

