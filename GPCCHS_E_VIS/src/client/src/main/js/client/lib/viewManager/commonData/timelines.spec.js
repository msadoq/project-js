/* eslint no-unused-expressions: 0 */
import '../../common/test';
import filter from './timelines';

describe('viewManager/commonData/timelines', () => {
  const list = [
    { id: 'tl1', sessionName: 'session1', offset: 0 },
    { id: 'tl2', sessionName: 'session2', offset: 10 },
    { id: 'other', sessionName: 'sessionOther', offset: -10 },
    { id: undefined, sessionName: 'invalid', offset: 0 },
  ];
  it('exact', () => {
    filter(list, 10, 'tl1').should.eql({ sessionName: 'session1', offset: 0 });
  });
  it('wildcard', () => {
    filter(list, 10, '*').should.eql({
      sessionId: 10,
      sessionName: '*',
      offset: 0,
    });
    filter(list, 10, 'tl*').should.eql({ error: 'invalid entry point, no timeline matches' });
  });
  it('no timeline', () => {
    filter(undefined, 10, 'tl1').should.eql({ error: 'invalid entry point, no timeline available' });
    filter([], 10, 'tl1').should.eql({ error: 'invalid entry point, no timeline available' });
  });
  it('no search', () => {
    filter(list, null, '').should.eql(
      { error: 'invalid entry point, no timeline set and no master session found' });
  });
  it('no match', () => {
    filter(list, 10, 'unknown').should.eql({ error: 'invalid entry point, no timeline matches' });
  });
});
