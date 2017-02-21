import {
  getSessions,
  getSession,
} from './sessions';

describe.only('store:sessions:selectors', () => {
  it('getSessions', () => {
    getSessions({
      sessions: [{ id: 'session1' }],
    }).should.eql([{ id: 'session1' }]);
  });
  it('getSession', () => {
    getSession({
      sessions: [
        {
          id: 'session1',
        },
      ],
    }, { sessionId: 'session1' }).should.eql({ id: 'session1' });
  });
});
