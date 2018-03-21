import dateFormat, { TAI } from './date';

describe('viewManager:commonData:date', () => {
  test('should retrieve date with Z (2018-03-21T13:52:57.608Z)', () => {
    expect(dateFormat(1521640377608)).toBe('2018-03-21T13:52:57.608Z');
  });
  test('should retrieve date without Z (2018-03-21T13:52:57.608) ', () => {
    expect(dateFormat(1521640377608, TAI)).toBe('2018-03-21T13:52:57.608');
  });
});
