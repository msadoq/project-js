/* eslint no-unused-expressions: 0 */
import { should, getStore } from '../../common/test';
import { getPage } from './pages';

describe('store:page', () => {
  describe('selectors', () => {
    it('getPage', () => {
      const { getState } = getStore({
        pages: {
          myPageId: { title: 'Title 1' },
        },
      });
      getPage(getState(), 'myPageId').should.have.property('title', 'Title 1');
      should.not.exist(getPage(getState(), 'unknownId'));
    });
    // it('getViews', () => {
    //   const { getState } = getStore({
    //     pages: {
    //       myPageId: { views: ['v3', 'v1', 'v4'] },
    //     },
    //     views: { v1: {}, v2: {}, v3: {} },
    //   });
    //   getViews(getState(), 'myPageId').should.eql([
    //     { viewId: 'v3' },
    //     { viewId: 'v1' },
    //   ]);
    // });
  });
});
