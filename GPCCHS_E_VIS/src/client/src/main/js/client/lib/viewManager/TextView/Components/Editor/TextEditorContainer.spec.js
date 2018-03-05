import TextEditorContainer from 'viewManager/TextView/Components/Editor/TextEditorContainer';
import { shallowRenderSnapshotInReduxForm } from '../../../../common/jest/utils';

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

describe('TextEditorContainer :: render', () => {
  test('snapshot', () => {
    shallowRenderSnapshotInReduxForm(TextEditorContainer, propsStub, {});
  });
});
