import TextSearch from 'viewManager/TextView/Components/Search/TextSearch';
import { shallowRenderSnapshot } from '../../../../common/jest/utils';

const propsStub = {
  viewId: 'view-id',
  pageId: 'page-id',
  searchCount: 0,
  searching: '',
  searchInView: () => null,
  resetSearchInView: () => null,
  closeSearch: () => null,
};

describe('TextSearch :: render', () => {
  test('snapshot', () => {
    shallowRenderSnapshot(TextSearch, propsStub, {});
  });
});
