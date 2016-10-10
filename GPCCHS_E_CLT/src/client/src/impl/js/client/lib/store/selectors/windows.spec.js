/* eslint no-unused-expressions: 0 */
import { should, getStore } from '../../common/test';
import { getWindow, getPages } from './windows';

describe('store:window', () => {
  describe('selectors', () => {
    it('getWindow', () => {
      const { getState } = getStore({
        windows: {
          myWindowId: { title: 'Title 1' },
        },
      });
      getWindow(getState(), 'myWindowId').should.have.property('title', 'Title 1');
      should.not.exist(getWindow(getState(), 'unknownId'));
    });
    it('getPages', () => {
      const { getState } = getStore({
        windows: {
          myWindowId: { pages: ['p3', 'p1', 'p4'] },
        },
        pages: { p1: {}, p2: {}, p3: {} },
      });
      getPages(getState(), 'myWindowId').should.eql([
        { pageId: 'p3' },
        { pageId: 'p1' },
      ]);
    });
    // describe.only('getFocusedPage', () => {
    //   it('works', () => {
    //     const { getState } = getStore({
    //       windows: {
    //         myWindowId: { focusedPage: 'p2', pages: ['p1', 'p2', 'p3'] },
    //       },
    //       pages: {
    //         p2: { title: 'Title 2' },
    //       },
    //     });
    //     getFocusedPage(getState(), 'myWindowId').should.equal('p2');
    //   });
    //   it('window doesn\'t exist', () => {
    //     const { getState } = getStore();
    //     should.not.exist(getFocusedPage(getState(), 'myWindowId'));
    //   });
    //   it('window hasn\'t page', () => {
    //     const { getState } = getStore({ windows: { myWindowId: {} } });
    //     should.not.exist(getFocusedPage(getState(), 'myWindowId'));
    //   });
    //   it('window has a focusedPage that isn\'t in pages', () => {
    //     const { getState } = getStore({ windows: { myWindowId: { focusedPage: 'p1' } } });
    //     should.not.exist(getFocusedPage(getState(), 'myWindowId'));
    //   });
    //   it('window has a focusedPage that doesn\'t exist', () => {
    //     const { getState } = getStore({
    //       windows: { myWindowId: { focusedPage: 'p1', pages: ['p1', 'p2'] } },
    //       pages: { p2: {} },
    //     });
    //     getFocusedPage(getState(), 'myWindowId').should.equal('p2');
    //   });
    //   it('window has a focusedPage that is not in pages', () => {
    //     const { getState } = getStore({
    //       windows: { myWindowId: { focusedPage: 'p2', pages: ['p1'] } },
    //       pages: { p1: {} }
    //     });
    //     getFocusedPage(getState(), 'myWindowId').should.equal('p1');
    //   });
    // });
  });
});
