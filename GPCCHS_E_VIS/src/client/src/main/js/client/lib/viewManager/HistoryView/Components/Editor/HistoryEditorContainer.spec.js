import HistoryEditorContainer from 'viewManager/HistoryView/Components/Editor/HistoryEditorContainer';
import { shallowRenderSnapshotInReduxForm } from 'common/jest/utils';

const propsStub = {
  viewId: 'view-id',
  pageId: 'page-id',
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

describe('HistoryEditorContainer :: render', () => {
  test('snapshot', () => {
    shallowRenderSnapshotInReduxForm(HistoryEditorContainer, propsStub, {});
  });
});
