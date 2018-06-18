import SearchComponentContainer from './SearchComponentContainer';
import { shallowRenderSnapshotInReduxForm } from '../../../common/jest/utils';

const propsStub = {
  viewId: 'view-id',
  pageId: 'page-id',
  searchCount: 0,
  searching: '',
  searchInView: () => null,
  resetSearchInView: () => null,
  closeSearch: () => null,
};

describe('SearchComponentContainer :: render', () => {
  test('snapshot', () => {
    shallowRenderSnapshotInReduxForm(SearchComponentContainer, propsStub, {});
  });
});
