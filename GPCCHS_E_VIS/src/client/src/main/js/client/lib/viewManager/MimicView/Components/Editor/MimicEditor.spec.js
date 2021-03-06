import MimicEditor from 'viewManager/MimicView/Components/Editor/MimicEditor';
import { shallowRenderSnapshot } from '../../../../common/jest/utils';

const propsStub = {
  viewId: 'view-id',
  pageId: 'pageId',
  search: 'search',
  tab: 0,
  openModal: () => null,
  updateViewTab: () => null,
  title: '',
  titleStyle: {},
  panels: {},
  updateViewPanels: () => null,
  configuration: {},
  currentDisplay: 0,
};

describe('HistoryEditor :: render', () => {
  test('snapshot', () => {
    shallowRenderSnapshot(MimicEditor, propsStub, {});
  });
});
