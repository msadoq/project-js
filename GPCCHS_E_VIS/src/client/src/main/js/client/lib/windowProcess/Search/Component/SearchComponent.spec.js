import SearchComponent from './SearchComponent';
import { shallowRenderSnapshot } from '../../../common/jest/utils';

const propsStub = {
  viewId: 'view-id',
  pageId: 'page-id',
  searchCount: 0,
  searching: '',
  searchInView: () => null,
  resetSearchInView: () => null,
  closeSearch: () => null,
};

describe('SearchComponent :: render', () => {
  test('snapshot', () => {
    shallowRenderSnapshot(SearchComponent, propsStub, {});
  });
});
