import { shallowRenderSnapshot } from 'common/jest/utils';
import EntryPointDetails from './EntryPointDetails';

const propsStub = {
  viewId: 'view1',
  pageId: 'page1',
  entryPoint: {
    id: 'e484fb2d-88f7-4327-95dc-3458ef381ea6',
    connectedData: {
      formula: 'Reporting.AGA_AM_ACQPRIORITY<ReportingParameter>.convertedValue',
    },
    stateColors: [],
  },
  updateEntryPoint: () => null,
  panels: [],
  updateViewSubPanels: () => null,
};
describe('viewManager', () => {
  describe('viewManager/common', () => {
    describe('viewManager/common/Components', () => {
      describe('viewManager/common/Components/Editor', () => {
        describe('viewManager/common/Components/Editor/EntryPointDetails', () => {
          test('EntryPointDetails :: snapshot', () => {
            shallowRenderSnapshot(EntryPointDetails, propsStub, {});
          });
        });
      });
    });
  });
});
