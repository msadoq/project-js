import PUS12Editor from 'viewManager/PUS12View/Components/Editor/PUS12Editor';
import { shallowRenderSnapshot } from 'common/jest/utils';
import stateTest from 'common/jest/stateTest';

const propsStub = {
  viewId: '1838f507-156b-4734-bf6d-69d0e96b39b8',
  pageId: 'pageId',
  configuration: {
    tables: {
      parameterMonitoringDefinitions: {
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

describe('PUS12Editor :: render', () => {
  test('snapshot', () => {
    shallowRenderSnapshot(PUS12Editor, propsStub, stateTest);
  });
});

