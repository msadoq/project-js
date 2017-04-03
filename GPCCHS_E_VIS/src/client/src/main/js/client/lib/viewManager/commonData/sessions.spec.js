import '../../common/test';
import filter, { reset } from './sessions';

describe('viewManager:commonData:sessions', () => {
  beforeEach(() => {
    reset();
  });
  const list = [{ name: 'Master', id: 0 },
    { name: 'Session#181', id: 181 }];

  it('should retrieve corresponding session', () => {
    filter(list, 'Master', 10).should.eql({ name: 'Master', id: 0 });
    filter(list, 'Session#181', 10).should.eql({ name: 'Session#181', id: 181 });
  });
  it('should return masterSessionId while receiving wildcard', () => {
    filter(list, '*', 10).should.eql({ id: 10 });
  });
  it('should support no domain', () => {
    filter(undefined, 'Master', 10)
    .should.eql({ error: 'invalid entry point, no session available' });
    filter([], 'Master', 10).should.eql({ error: 'invalid entry point, no session available' });
  });
  it('should support no search', () => {
    filter(list, '', 10).should.eql({ error: 'invalid entry point, invalid session name' });
    filter(list, undefined, 10).should.eql({ error: 'invalid entry point, invalid session name' });
  });
  it('should return nothing if no session matches', () => {
    filter(list, 'unknown', 10).should.eql({ error: 'invalid entry point, no session matches' });
  });
  it('should support multiple matches', () => {
    const newList = [{ name: 'Master', id: 0 },
      { name: 'Session#181', id: 181 },
      { name: 'Master', id: 3 }];
    filter(newList, 'Master', 10).should.eql({
      error: 'invalid entry point, more than one session match',
    });
  });
  it('should memoize', () => {
    const result = filter(list, 'Master', 10);
    filter(list, 'Master', 10).should.equal(result);
  });
  it('should reset memoize on new session list', () => {
    filter(list, 'Master', 10).should.eql({ name: 'Master', id: 0 });
    const otherList = [...list];
    otherList[1] = { id: 100, name: 'session100' };
    filter(otherList, 'session100').should.eql({ id: 100, name: 'session100' });
  });
});
