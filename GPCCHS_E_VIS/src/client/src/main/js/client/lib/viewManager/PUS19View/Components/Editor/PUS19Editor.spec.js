import PUS19Editor from 'viewManager/PUS19View/Components/Editor/PUS19Editor';
import { shallowRenderSnapshot } from 'common/jest/utils';
import stateTest from 'common/jest/stateTest';

const propsStub = {
  viewId: '1838f507-196b-4734-bf6d-69d0e96b39b8',
  pageId: 'pageId',
  configuration: {
    tables: {
      eventActions: {
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

describe('PUS19Editor :: render', () => {
  test('snapshot', () => {
    shallowRenderSnapshot(PUS19Editor, propsStub, stateTest);
  });
});

