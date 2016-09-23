/* eslint no-unused-expressions: 0 */
import { getStore } from '../utils/test';
import decorate from './decorate';

describe('connectedData/decorate', () => {
  const { getState } = getStore({
    domains: [
      { oid: 'd1', name: 'cnes.isis.sat1' },
      { oid: 'd2', name: 'cnes.isis.sat2' },
      { oid: 'd3', name: 'cnes.isis.sat2.ion' },
      { oid: 'd4', name: 'cnes.isis.sat2.flak' },
    ],
    timebars: {
      tb1: { timelines: ['tl1', 'tl3', 'tl4'] },
      tb2: { timelines: ['tl2'] },
    },
    timelines: {
      tl1: { id: 'TL1', sessionId: 's1' },
      tl2: { id: 'TL2', sessionId: 's2' },
      tl3: { id: 'TL3', sessionId: 's3' },
      tl4: { id: '4TL', sessionId: 's4' },
    },
  });

  it('empty state', () => {
    decorate({}, [{ formula: 'c.pn<co>.f' }]).should.eql([]);
  });
  it('empty argument', () => {
    decorate({ domains: [] }, []).should.eql([]);
  });
  it('simple domain and timeline', () => {
    decorate(getState(), [
        { domain: 'cnes.isis.sat1', timebarId: 'tb1', timeline: 'TL1', formula: 'c.pn<co>.f' },
        { domain: 'cnes.isis.sat2', timebarId: 'tb2', timeline: 'TL2', formula: 'c2.pn2<co2>.f2' },
    ]).should.eql([
      { catalog: 'c', parameterName: 'pn', comObject: 'co', domainId: 'd1', sessionId: 's1' },
      { catalog: 'c2', parameterName: 'pn2', comObject: 'co2', domainId: 'd2', sessionId: 's2' },
    ]);
  });
  it('different timelines', () => {
    decorate(getState(), [
      { domain: 'cnes.isis.sat1', timebarId: 'tb1', timeline: 'TL2', formula: 'c.pn<co>.f' },
    ]).should.eql([]);
  });
  it('domain wildcard', () => {
    decorate(getState(), [
      { domain: 'cnes.isis.sat2*', timebarId: 'tb2', timeline: 'TL2', formula: 'c.pn<co>.f' },
    ]).should.eql([
      { catalog: 'c', parameterName: 'pn', comObject: 'co', domainId: 'd2', sessionId: 's2' },
      { catalog: 'c', parameterName: 'pn', comObject: 'co', domainId: 'd3', sessionId: 's2' },
      { catalog: 'c', parameterName: 'pn', comObject: 'co', domainId: 'd4', sessionId: 's2' },
    ]);
  });
  it('timeline wildcard', () => {
    decorate(getState(), [
      { domain: 'cnes.isis.sat1', timebarId: 'tb1', timeline: 'TL*', formula: 'c.pn<co>.f' },
    ]).should.eql([
      { catalog: 'c', parameterName: 'pn', comObject: 'co', domainId: 'd1', sessionId: 's1' },
      { catalog: 'c', parameterName: 'pn', comObject: 'co', domainId: 'd1', sessionId: 's3' },
    ]);
  });
  it('mix', () => {
    decorate(getState(), [
      { domain: 'cnes.isis.sat2.flak', timebarId: 'tb1', timeline: 'TL1', formula: 'c.pn<co>.f' },
      { domain: 'cnes.isis.sat1', timebarId: 'tb1', timeline: 'TL*', formula: 'c2.pn<co>.f' },
      { domain: 'cnes.isis.sat2*', timebarId: 'tb2', timeline: 'TL2', formula: 'c3.pn<co>.f' },
    ]).should.eql([
      { catalog: 'c', parameterName: 'pn', comObject: 'co', domainId: 'd4', sessionId: 's1' },
      { catalog: 'c2', parameterName: 'pn', comObject: 'co', domainId: 'd1', sessionId: 's1' },
      { catalog: 'c2', parameterName: 'pn', comObject: 'co', domainId: 'd1', sessionId: 's3' },
      { catalog: 'c3', parameterName: 'pn', comObject: 'co', domainId: 'd2', sessionId: 's2' },
      { catalog: 'c3', parameterName: 'pn', comObject: 'co', domainId: 'd3', sessionId: 's2' },
      { catalog: 'c3', parameterName: 'pn', comObject: 'co', domainId: 'd4', sessionId: 's2' },
    ]);
  });
  it ('double wildcard', () => {
    decorate(getState(), [
      { domain: '*', timebarId: 'tb1', timeline: '*', formula: 'c.pn<co>.f' },
    ]).should.eql([
      { catalog: 'c', parameterName: 'pn', comObject: 'co', domainId: 'd1', sessionId: 's1' },
      { catalog: 'c', parameterName: 'pn', comObject: 'co', domainId: 'd1', sessionId: 's3' },
      { catalog: 'c', parameterName: 'pn', comObject: 'co', domainId: 'd1', sessionId: 's4' },
      { catalog: 'c', parameterName: 'pn', comObject: 'co', domainId: 'd2', sessionId: 's1' },
      { catalog: 'c', parameterName: 'pn', comObject: 'co', domainId: 'd2', sessionId: 's3' },
      { catalog: 'c', parameterName: 'pn', comObject: 'co', domainId: 'd2', sessionId: 's4' },
      { catalog: 'c', parameterName: 'pn', comObject: 'co', domainId: 'd3', sessionId: 's1' },
      { catalog: 'c', parameterName: 'pn', comObject: 'co', domainId: 'd3', sessionId: 's3' },
      { catalog: 'c', parameterName: 'pn', comObject: 'co', domainId: 'd3', sessionId: 's4' },
      { catalog: 'c', parameterName: 'pn', comObject: 'co', domainId: 'd4', sessionId: 's1' },
      { catalog: 'c', parameterName: 'pn', comObject: 'co', domainId: 'd4', sessionId: 's3' },
      { catalog: 'c', parameterName: 'pn', comObject: 'co', domainId: 'd4', sessionId: 's4' },

    ]);
  });
  it ('duplication', () => {
    decorate(getState(), [
      { domain: 'cnes.isis.sat1', timebarId: 'tb1', timeline: 'TL1', formula: 'c.pn<co>.f' },
      { domain: 'cnes.isis.sat1', timebarId: 'tb1', timeline: 'TL1', formula: 'c.pn<co>.f' },
    ]).should.eql([
      { catalog: 'c', parameterName: 'pn', comObject: 'co', domainId: 'd1', sessionId: 's1' },

    ]);
  });
});
