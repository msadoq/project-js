import TextEditor from 'viewManager/TextView/Components/Editor/TextEditor';
import { shallowRenderSnapshot } from '../../../../common/jest/utils';

const propsStub = {
  viewId: 'view-id',
  pageId: 'pageId',
  search: 'search',
  tab: 0,
  openModal: () => null,
  updateViewTab: () => null,
  title: '',
  panels: {},
  updateViewPanels: () => null,
  configuration: {},
  currentDisplay: 0,
};

describe('TextEditor :: render', () => {
  test('snapshot', () => {
    shallowRenderSnapshot(TextEditor, propsStub, {});
  });
});
