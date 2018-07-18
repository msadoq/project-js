import PUS15Tab from 'viewManager/PUS15View/Components/Editor/PUS15Tab';
import { shallowRenderSnapshot } from 'common/jest/utils';
import stateTest from 'common/jest/stateTest';

const propsStub = {
  panels: {},
  updateViewPanels: () => {},
  viewId: '1838f507-156b-4734-bf6d-69d0e96b39b8',
};

describe('PUS15Tab :: render', () => {
  test('snapshot', () => {
    shallowRenderSnapshot(PUS15Tab, propsStub, stateTest);
  });
});

