/* eslint no-unused-expressions: 0 */
import { should, getStore } from '../../common/test';
import { getPages, getPage } from './pages';

describe('store:page:selectors', () => {
  it('getPage', () => {
    const { getState } = getStore({
      pages: {
        myPageId: { title: 'Title 1' },
      },
    });
    getPage(getState(), 'myPageId').should.have.property('title', 'Title 1');
    should.not.exist(getPage(getState(), 'unknownId'));
  });
  describe('getPages', () => {
    it('should returns pages', () => {
      const state = {
        pages: {
          myId: { title: 'Title' },
          myOtherId: { title: 'Title other' },
        },
      };
      const { getState } = getStore(state);
      getPages(getState()).should.equal(state.pages);
    });
  });
});
