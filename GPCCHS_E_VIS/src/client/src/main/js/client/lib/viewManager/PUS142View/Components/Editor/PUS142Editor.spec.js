import PUS142Editor from 'viewManager/PUS142View/Components/Editor/PUS142Editor';
import { shallowRenderSnapshot } from 'common/jest/utils';
import stateTest from 'common/jest/stateTest';

const propsStub = {
  viewId: '1838f507-156b-4734-bf6d-69d0e96b39b8',
  pageId: 'pageId',
  configuration: {
    tables: {
      functionalMonitoring: {
        cols: [],
      },
      parameterMonitorings: {
        cols: [],
      },
    },
  },
  panels: {},
  updateEntryPoint: () => null,
  updateViewTab: () => null,
  updateViewPanels: () => null,
  openModal: () => null,
};

describe('PUS142Editor :: render', () => {
  test('snapshot', () => {
    shallowRenderSnapshot(PUS142Editor, propsStub, stateTest);
  });
});

