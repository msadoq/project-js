import PUS15Editor from 'viewManager/PUS15View/Components/Editor/PUS15Editor';
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

describe('PUS15Editor :: render', () => {
  test('snapshot', () => {
    shallowRenderSnapshot(PUS15Editor, propsStub, stateTest);
  });
});

