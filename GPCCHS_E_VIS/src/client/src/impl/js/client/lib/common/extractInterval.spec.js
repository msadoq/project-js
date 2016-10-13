/* eslint no-unused-expressions: 0 */
import extractInterval from './extractInterval';

describe('common:extractInterval', () => {
  it('first whole', () => {
    const knownIntervals = [[0, 7], [11, 14], [42, 91]];
    const intervalToExtract = [0, 7];
    const intervals = extractInterval(knownIntervals, intervalToExtract);
    intervals.should.have.properties([[11, 14], [42, 91]]);
  });
  it('first first', () => {
    const knownIntervals = [[0, 7], [11, 14], [42, 91]];
    const intervalToExtract = [0, 5];
    const intervals = extractInterval(knownIntervals, intervalToExtract);
    intervals.should.have.properties([[5, 7], [11, 14], [42, 91]]);
  });
  it('first middle', () => {
    const knownIntervals = [[0, 7], [11, 14], [42, 91]];
    const intervalToExtract = [2, 5];
    const intervals = extractInterval(knownIntervals, intervalToExtract);
    intervals.should.have.properties([[0, 2], [5, 7], [11, 14], [42, 91]]);
  });
  it('first last', () => {
    const knownIntervals = [[0, 7], [11, 14], [42, 91]];
    const intervalToExtract = [5, 7];
    const intervals = extractInterval(knownIntervals, intervalToExtract);
    intervals.should.have.properties([[0, 5], [11, 14], [42, 91]]);
  });
  it('middle whole', () => {
    const knownIntervals = [[0, 7], [11, 14], [42, 91]];
    const intervalToExtract = [11, 14];
    const intervals = extractInterval(knownIntervals, intervalToExtract);
    intervals.should.have.properties([[0, 7], [42, 91]]);
  });
  it('middle first', () => {
    const knownIntervals = [[0, 7], [11, 14], [42, 91]];
    const intervalToExtract = [11, 13];
    const intervals = extractInterval(knownIntervals, intervalToExtract);
    intervals.should.have.properties([[0, 7], [13, 14], [42, 91]]);
  });
  it('middle middle', () => {
    const knownIntervals = [[0, 7], [11, 14], [42, 91]];
    const intervalToExtract = [12, 13];
    const intervals = extractInterval(knownIntervals, intervalToExtract);
    intervals.should.have.properties([[0, 7], [11, 12], [13, 14], [42, 91]]);
  });
  it('middle last', () => {
    const knownIntervals = [[0, 7], [11, 14], [42, 91]];
    const intervalToExtract = [12, 14];
    const intervals = extractInterval(knownIntervals, intervalToExtract);
    intervals.should.have.properties([[0, 7], [11, 12], [42, 91]]);
  });
  it('last whole', () => {
    const knownIntervals = [[0, 7], [11, 14], [42, 91]];
    const intervalToExtract = [42, 91];
    const intervals = extractInterval(knownIntervals, intervalToExtract);
    intervals.should.have.properties([[0, 7], [11, 14]]);
  });
  it('last first', () => {
    const knownIntervals = [[0, 7], [11, 14], [42, 91]];
    const intervalToExtract = [42, 49];
    const intervals = extractInterval(knownIntervals, intervalToExtract);
    intervals.should.have.properties([[0, 7], [11, 14], [49, 91]]);
  });
  it('last middle', () => {
    const knownIntervals = [[0, 7], [11, 14], [42, 91]];
    const intervalToExtract = [77, 82];
    const intervals = extractInterval(knownIntervals, intervalToExtract);
    intervals.should.have.properties([[0, 7], [11, 14], [42, 77], [82, 91]]);
  });
  it('last last', () => {
    const knownIntervals = [[0, 7], [11, 14], [42, 91]];
    const intervalToExtract = [77, 91];
    const intervals = extractInterval(knownIntervals, intervalToExtract);
    intervals.should.have.properties([[0, 7], [11, 14], [42, 77]]);
  });
});
