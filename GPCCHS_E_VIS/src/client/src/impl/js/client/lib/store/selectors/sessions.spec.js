import {
  getSession,
} from './sessions';

describe('store:sessions:selectors', () => {
  it('getSession', () => {
    getSession({
      sessions: [
        {
          id: 'session1',
        }
      ]
    }, 'session1').should.eql({ id: 'session1' });
  });
});
