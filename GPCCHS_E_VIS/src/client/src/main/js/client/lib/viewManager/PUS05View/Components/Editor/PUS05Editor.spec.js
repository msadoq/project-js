import PUS05Editor from 'viewManager/PUS05View/Components/Editor/PUS05Editor';
import { shallowRenderSnapshot } from 'common/jest/utils';
import stateTest from 'common/jest/stateTest';

const propsStub = {
  viewId: '1838f507-156b-4734-bf6d-69d0e96b39b8',
  pageId: 'pageId',
  configuration: {
    tables: {
      subSchedules: {
        cols: [],
      },
      enabledApids: {
        cols: [],
      },
      commands: {
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

describe('PUS05Editor :: render', () => {
  test('snapshot', () => {
    shallowRenderSnapshot(PUS05Editor, propsStub, stateTest);
  });
});

