import PUS19Tab from 'viewManager/PUS19View/Components/Editor/PUS19Tab';
import { shallowRenderSnapshot } from 'common/jest/utils';
import stateTest from 'common/jest/stateTest';

const propsStub = {
  panels: {},
  updateViewPanels: () => {},
  viewId: '1838f507-196b-4734-bf6d-69d0e96b39b8',
};

describe('PUS19Tab :: render', () => {
  test('snapshot', () => {
    shallowRenderSnapshot(PUS19Tab, propsStub, stateTest);
  });
});

