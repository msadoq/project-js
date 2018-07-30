import { formatDate } from './utils';

describe('viewManager/common/pus/utils', () => {
  describe('formatDate', () => {
    it('should format correctly date with valid data', () => {
      expect(formatDate(1532941906431)).toEqual('2018-07-30T09:11:46.431Z');
    });
    it('should\'nt try to format invalid date', () => {
      expect(formatDate('foo')).toEqual('foo');
    });
  });
});
