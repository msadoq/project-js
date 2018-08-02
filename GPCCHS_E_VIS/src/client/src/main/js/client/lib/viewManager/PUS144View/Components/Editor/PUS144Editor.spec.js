import PUS144Editor from 'viewManager/PUS144View/Components/Editor/PUS144Editor';
import { shallowRenderSnapshot } from 'common/jest/utils';
import stateTest from 'common/jest/stateTest';

const propsStub = {
  viewId: '1838f507-156b-4734-bf6d-69d0e96b39b8',
  pageId: 'pageId',
  configuration: {
    tables: {
      onBoardPartitions: {
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

describe('PUS144Editor :: render', () => {
  test('snapshot', () => {
    shallowRenderSnapshot(PUS144Editor, propsStub, stateTest);
  });
});

