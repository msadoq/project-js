import GroundAlarmEditor from 'viewManager/GroundAlarmView/Components/Editor/GroundAlarmEditor';
import { shallowRenderSnapshot } from 'common/jest/utils';
import stateTest from 'common/jest/stateTest';

const propsStub = {
  configuration: {
    entryPoints: [],
    tables: {
      main: {
        cols: [],
      },
    },
  },
  domains: [],
  openModal: () => {},
  pageId: '36928294-0955-43c4-bc95-dcde52fadc47',
  panels: {},
  tab: 1,
  timelines: [],
  title: 'Ground Alarm View',
  updateEntryPoint: () => {},
  updateViewPanels: () => {},
  updateViewTab: () => {},
  viewId: '1838f507-156b-4734-bf6d-69d0e96b39b8',
};

describe('GroundAlarmEditor :: render', () => {
  test('snapshot', () => {
    shallowRenderSnapshot(GroundAlarmEditor, propsStub, stateTest);
  });
});

