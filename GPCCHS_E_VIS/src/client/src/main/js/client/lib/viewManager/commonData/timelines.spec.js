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
    filter(list, 'tl1').should.eql({ sessionName: 'session1', offset: 0 });
  });
  it('wildcard', () => {
    filter(list, '*').should.eql({ sessionName: '*', offset: 0 });
    filter(list, 'tl*').should.eql({ error: 'invalid entry point, no timeline matches' });
  });
  it('no timeline', () => {
    filter(undefined, 'tl1').should.eql({ error: 'invalid entry point, no timeline available' });
    filter([], 'tl1').should.eql({ error: 'invalid entry point, no timeline available' });
  });
  it('no search', () => {
    filter(list, '').should.eql(
      { error: 'invalid entry point, no timeline set' });
  });
  it('no match', () => {
    filter(list, 'unknown').should.eql({ error: 'invalid entry point, no timeline matches' });
  });
});
