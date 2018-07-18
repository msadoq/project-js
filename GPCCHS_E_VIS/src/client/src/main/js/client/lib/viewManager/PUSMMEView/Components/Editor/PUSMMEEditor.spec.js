import PUSMMEEditor from 'viewManager/PUSMMEView/Components/Editor/PUSMMEEditor';
import { shallowRenderSnapshot } from 'common/jest/utils';
import stateTest from 'common/jest/stateTest';

const propsStub = {
  viewId: '1838f507-156b-4734-bf6d-69d0e96b39b8',
  pageId: 'pageId',
  configuration: {
    tables: {
      packets: {
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

describe('PUSMMEEditor :: render', () => {
  test('snapshot', () => {
    shallowRenderSnapshot(PUSMMEEditor, propsStub, stateTest);
  });
});

