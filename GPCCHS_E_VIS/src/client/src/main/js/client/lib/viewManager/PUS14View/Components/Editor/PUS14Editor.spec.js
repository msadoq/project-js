import PUS14Editor from 'viewManager/PUS14View/Components/Editor/PUS14Editor';
import { shallowRenderSnapshot } from 'common/jest/utils';
import stateTest from 'common/jest/stateTest';

const propsStub = {
  viewId: '1838f507-156b-4734-bf6d-69d0e96b39b8',
  pageId: 'pageId',
  configuration: {
    tables: {
      packetForwarding: {
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

describe('PUS14Editor :: render', () => {
  test('snapshot', () => {
    shallowRenderSnapshot(PUS14Editor, propsStub, stateTest);
  });
});

