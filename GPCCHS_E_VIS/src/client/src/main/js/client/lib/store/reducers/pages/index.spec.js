/* eslint no-unused-expressions: 0 */
import { freezeArgs, should } from '../../../common/test';
import * as types from '../../types';
import pagesReducer, {
  getPages,
  getPage,
} from '.';

/* --- Reducer -------------------------------------------------------------- */

const reducer = freezeArgs(pagesReducer);

describe('store:pages:reducer', () => {
  it('initial state', () => {
    reducer(undefined, {}).should.be.an('object').that.is.empty;
  });
  it('unknown action', () => {
    const state = { myPageId: { title: 'Title' } };
    reducer(state, {}).should.eql(state);
  });
  it('unknown action with pageId', () => {
    const state = { myPageId: { title: 'Title' } };
    reducer(state, { payload: { pageId: 'myPageId' } }).should.eql(state);
  });
  describe('HSC workspace', () => {
    it('close', () => {
      reducer({ myPage: { timebarHeight: 5 } }, { type: types.HSC_CLOSE_WORKSPACE })
      .should.be.an('object').that.is.empty;
    });
  });
});

/* --- Selectors ------------------------------------------------------------ */

/* eslint no-unused-expressions: 0 */


describe('store:page:selectors', () => {
  describe('getPage', () => {
    it('should returns page', () => {
      const state = {
        pages: {
          myPageId: { title: 'Title 1' },
        },
      };
      getPage(state, { pageId: 'myPageId' }).should.have.property('title', 'Title 1');
      should.not.exist(getPage(state, 'unknownId'));
    });
  });
  describe('getPages', () => {
    it('should returns pages', () => {
      const state = {
        pages: {
          myId: { title: 'Title' },
          myOtherId: { title: 'Title other' },
        },
      };

      getPages(state).should.equal(state.pages);
    });
  });
});
