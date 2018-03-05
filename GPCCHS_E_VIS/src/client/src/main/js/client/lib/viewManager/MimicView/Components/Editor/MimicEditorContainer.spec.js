import MimicEditorContainer from 'viewManager/MimicView/Components/Editor/MimicEditorContainer';
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

describe('MimicEditorContainer :: render', () => {
  test('snapshot', () => {
    shallowRenderSnapshotInReduxForm(MimicEditorContainer, propsStub, {});
  });
});
