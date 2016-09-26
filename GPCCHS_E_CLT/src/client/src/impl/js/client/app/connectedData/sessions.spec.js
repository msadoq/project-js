/* eslint no-unused-expressions: 0 */
import '../utils/test';
import filter from './sessions';

describe('connectedData/sessions', () => {
  const list = [
    { id: 'tl1', sessionId: 'session1', offset: 0 },
    { id: 'tl2', sessionId: 'session2', offset: 10 },
    { id: 'other', sessionId: 'sessionOther', offset: -10 },
    { id: undefined, sessionId: 'invalid', offset: 0 },
  ];
  it('exact', () => {
    filter(list, 'tl1').should.eql([{ sessionId: 'session1', offset: 0 }]);
  });
  it('wildcard', () => {
    filter(list, '*').should.eql([
      { sessionId: 'session1', offset: 0 },
      { sessionId: 'session2', offset: 10 },
      { sessionId: 'sessionOther', offset: -10 }
    ]);
    filter(list, 'tl*').should.eql([
      { sessionId: 'session1', offset: 0 },
      { sessionId: 'session2', offset: 10 },
    ]);
    filter(list, 't?1').should.eql([{ sessionId: 'session1', offset: 0 }]);
    filter(list, 't??').should.eql([
      { sessionId: 'session1', offset: 0 },
      { sessionId: 'session2', offset: 10 },
    ]);
    filter(list, '*l*').should.eql([
      { sessionId: 'session1', offset: 0 },
      { sessionId: 'session2', offset: 10 },
    ]);
  });
  it('no timeline', () => {
    filter(undefined, 'tl1').should.eql([]);
    filter([], 'tl1').should.eql([]);
  });
  it('no search', () => {
    filter(list, '').should.eql([]);
    filter(list).should.eql([]);
  });
  it('no match', () => {
    filter(list, 'unknown').should.eql([]);
  });
});
