import {
  getSession,
} from './sessions';

describe('store:sessions:selectors', () => {
  it('getSession', () => {
    getSession({
      sessions: {
        session1: {}
      }
    }, 'session1').should.be.an('object');
  });
});
