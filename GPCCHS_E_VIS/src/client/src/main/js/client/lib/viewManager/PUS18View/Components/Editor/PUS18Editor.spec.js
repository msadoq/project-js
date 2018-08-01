import PUS18Editor from 'viewManager/PUS18View/Components/Editor/PUS18Editor';
import { shallowRenderSnapshot } from 'common/jest/utils';
import stateTest from 'common/jest/stateTest';

const propsStub = {
  viewId: '1838f507-186b-4734-bf6d-69d0e96b39b8',
  pageId: 'pageId',
  configuration: {
    tables: {
      onBoardStorages: {
        cols: [],
      },
      storageDef: {
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

describe('PUS18Editor :: render', () => {
  test('snapshot', () => {
    shallowRenderSnapshot(PUS18Editor, propsStub, stateTest);
  });
});

