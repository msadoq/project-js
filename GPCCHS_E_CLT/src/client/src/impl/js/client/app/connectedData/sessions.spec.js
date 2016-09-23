/* eslint no-unused-expressions: 0 */
import '../utils/test';
import filter from './sessions';

describe('connectedData/sessions', () => {
  const list = [
    { id: 'tl1', sessionId: 'session1' },
    { id: 'tl2', sessionId: 'session2' },
    { id: 'other', sessionId: 'sessionOther' },
    { id: undefined, sessionId: 'invalid' },
  ];
  it('exact', () => {
    filter(list, 'tl1').should.eql(['session1']);
  });
  it('wildcard', () => {
    filter(list, '*').should.eql(['session1', 'session2', 'sessionOther']);
    filter(list, 'tl*').should.eql(['session1', 'session2']);
    filter(list, 't?1').should.eql(['session1']);
    filter(list, 't??').should.eql(['session1', 'session2']);
    filter(list, '*l*').should.eql(['session1', 'session2']);
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
