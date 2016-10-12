import { should } from '../../lib/common/test';
import missingIntervals from './missingIntervals';

describe('utils/missingIntervals', () => {
  const interval = [10, 20];
  it('no previous', () => {
    missingIntervals([], [10, 20]).should.eql([[10, 20]]);
  });
  it('same', () => {
    missingIntervals(interval, [10, 20]).should.eql([]);
  });
  it('in', () => {
    missingIntervals(interval, [10, 11]).should.eql([]);
    missingIntervals(interval, [19, 20]).should.eql([]);
    missingIntervals(interval, [14, 16]).should.eql([]);
  });
  it('fully outside', () => {
    missingIntervals(interval, [1, 9]).should.eql([[1, 9]]);
    missingIntervals(interval, [21, 30]).should.eql([[21, 30]]);
  });
  it('around', () => {
    missingIntervals(interval, [9, 21]).should.eql([[9, 10], [20, 21]]);
  });
  it('lap before', () => {
    missingIntervals(interval, [9, 11]).should.eql([[9, 10]]);
    missingIntervals(interval, [9, 10]).should.eql([[9, 10]]);
  });
  it('lap after', () => {
    missingIntervals(interval, [19, 21]).should.eql([[20, 21]]);
    missingIntervals(interval, [20, 21]).should.eql([[20, 21]]);
  });
});
