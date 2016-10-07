/* eslint no-unused-expressions: 0 */
import { should, getStore } from '../../utils/test';
import { getView } from './views';

describe('store:views', () => {
  describe('selectors', () => {
    it('getView', () => {
      const { getState } = getStore({
        views: {
          myViewId: { title: 'Title 1' },
        },
      });
      getView(getState(), 'myViewId').should.have.property('title', 'Title 1');
      should.not.exist(getView(getState(), 'unknownId'));
    });
  });
});
