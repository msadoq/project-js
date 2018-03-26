import TextSearchContainer from 'viewManager/TextView/Components/Search/TextSearchContainer';
import { shallowRenderSnapshotInReduxForm } from '../../../../common/jest/utils';

const propsStub = {
  viewId: 'view-id',
  pageId: 'page-id',
  searchCount: 0,
  searching: '',
  searchInView: () => null,
  resetSearchInView: () => null,
  closeSearch: () => null,
};

describe('TextSearchContainer :: render', () => {
  test('snapshot', () => {
    shallowRenderSnapshotInReduxForm(TextSearchContainer, propsStub, {});
  });
});
