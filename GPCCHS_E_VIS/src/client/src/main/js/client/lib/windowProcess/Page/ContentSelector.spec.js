import { freezeMe, testMemoization, should } from '../../common/test';

import {
  getPageLayoutWithCollapsed,
  getTimebarUuid,
  getMaximizedViewdUuid,
} from './ContentSelector';

describe('windowProcess:Page:ContentSelector', () => {
  const state = freezeMe({
    windows: {
      myWindow: { focusedPage: 'myPage' },
      w2: { focusedPage: 'pageWithMaximised' },
    },
    pages: {
      myPage: {
        timebarUuid: 'tbuuid',
        layout: [
          { i: 'layout1' },
          { i: 'layout2' },
        ],
      },
      pageWithMaximised: {
        layout: [{ i: 'geometry1', maximized: true }],
      },
    },
  });
  describe('getPageLayoutWithCollapsed', () => {
    it('returns page layout with collapsed geometries', () => {
      getPageLayoutWithCollapsed(state, { pageId: 'myPage' }).should.have.properties({
        lg: [{ i: 'layout1' }, { i: 'layout2' }],
      });
    });
    it('should memoize', () => {
      testMemoization(getPageLayoutWithCollapsed, state, { pageId: 'myPage' });
    });
  });

  describe('getTimebarUuid', () => {
    it('returns focused page timebarUuid', () => {
      getTimebarUuid(state, { windowId: 'myWindow' }).should.be.eql('tbuuid');
    });
    it('should memoize', () => {
      testMemoization(getTimebarUuid, state, { windowId: 'myWindow' });
    });
  });

  describe('getMaximizedViewdUuid', () => {
    it('should returns null when no maximised views', () => {
      should.not.exist(getMaximizedViewdUuid(state, { windowId: 'myWindow' }));
    });
    it('should returns maximised view uuid', () => {
      getMaximizedViewdUuid(state, { windowId: 'w2' }).should.be.eql('geometry1');
    });
    it('should memoize', () => {
      testMemoization(getMaximizedViewdUuid, state, { windowId: 'w2' });
    });
  });
});
