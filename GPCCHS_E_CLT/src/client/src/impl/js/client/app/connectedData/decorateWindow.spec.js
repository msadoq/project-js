/* eslint no-unused-expressions: 0 */
import { getStore } from '../utils/test';
import decorate from './decorateWindow';

describe('connectedData/decorate', () => {
  const { getState } = getStore({
    domains: [
      { domainId: 'd1', name: 'cnes.isis.sat1' },
      { domainId: 'd2', name: 'cnes.isis.sat2' },
      { domainId: 'd3', name: 'cnes.isis.sat2.ion' },
      { domainId: 'd4', name: 'cnes.isis.sat2.flak' },
    ],
    timebars: {
      tb1: { timelines: ['tl1', 'tl3', 'tl4'] },
      tb2: { timelines: ['tl2'] },
    },
    timelines: {
      tl1: { id: 'TL1', sessionId: 's1', offset: 0 },
      tl2: { id: 'TL2', sessionId: 's2', offset: 10 },
      tl3: { id: 'TL3', sessionId: 's3', offset: -10 },
      tl4: { id: '4TL', sessionId: 's4', offset: 0 },
    },
  });

  const assert = (r, catalog, parameterName, comObject, domainId, sessionId, offset) => {
    r.should.be.an('object').with.property('offset', offset);
    r.dataId.should.be.an('object').with.properties({
      catalog,
      parameterName,
      comObject,
      domainId,
      sessionId,
    });
  };

  it('empty state', () => {
    decorate({}, [{ formula: 'c.pn<co>.f' }]).should.eql([]);
  });
  it('empty argument', () => {
    decorate({ domains: [] }, []).should.eql([]);
  });
  it('simple domain and timeline', () => {
    const r = decorate(getState(), [
        { domain: 'cnes.isis.sat1', timebarId: 'tb1', timeline: 'TL1', formula: 'c.pn<co>.f' },
        { domain: 'cnes.isis.sat2', timebarId: 'tb2', timeline: 'TL2', formula: 'c2.pn2<co2>.f2' },
    ]);
    assert(r[0], 'c', 'pn', 'co', 'd1', 's1', 0);
    assert(r[1], 'c2', 'pn2', 'co2', 'd2', 's2', 10);
  });
  it('different timelines', () => {
    decorate(getState(), [
      { domain: 'cnes.isis.sat1', timebarId: 'tb1', timeline: 'TL2', formula: 'c.pn<co>.f' },
    ]).should.eql([]);
  });
  it('domain wildcard', () => {
    const r = decorate(getState(), [
      { domain: 'cnes.isis.sat2*', timebarId: 'tb2', timeline: 'TL2', formula: 'c.pn<co>.f' },
    ]);
    assert(r[0], 'c', 'pn', 'co', 'd2', 's2', 10);
    assert(r[1], 'c', 'pn', 'co', 'd3', 's2', 10);
    assert(r[2], 'c', 'pn', 'co', 'd4', 's2', 10);
  });
  it('timeline wildcard', () => {
    const r = decorate(getState(), [
      { domain: 'cnes.isis.sat1', timebarId: 'tb1', timeline: 'TL*', formula: 'c.pn<co>.f' },
    ]);
    assert(r[0], 'c', 'pn', 'co', 'd1', 's1', 0);
    assert(r[1], 'c', 'pn', 'co', 'd1', 's3', -10);
  });
  it('mix', () => {
    const r = decorate(getState(), [
      { domain: 'cnes.isis.sat2.flak', timebarId: 'tb1', timeline: 'TL1', formula: 'c.pn<co>.f' },
      { domain: 'cnes.isis.sat1', timebarId: 'tb1', timeline: 'TL*', formula: 'c2.pn<co>.f' },
      { domain: 'cnes.isis.sat2*', timebarId: 'tb2', timeline: 'TL2', formula: 'c3.pn<co>.f' },
    ]);
    assert(r[0], 'c', 'pn', 'co', 'd4', 's1', 0);
    assert(r[1], 'c2', 'pn', 'co', 'd1', 's1', 0);
    assert(r[2], 'c2', 'pn', 'co', 'd1', 's3', -10);
    assert(r[3], 'c3', 'pn', 'co', 'd2', 's2', 10);
    assert(r[4], 'c3', 'pn', 'co', 'd3', 's2', 10);
    assert(r[5], 'c3', 'pn', 'co', 'd4', 's2', 10);
  });
  it('double wildcard', () => {
    const r = decorate(getState(), [
      { domain: '*', timebarId: 'tb1', timeline: '*', formula: 'c.pn<co>.f' },
    ]);
    assert(r[0], 'c', 'pn', 'co', 'd1', 's1', 0);
    assert(r[1], 'c', 'pn', 'co', 'd1', 's3', -10);
    assert(r[2], 'c', 'pn', 'co', 'd1', 's4', 0);
    assert(r[3], 'c', 'pn', 'co', 'd2', 's1', 0);
    assert(r[4], 'c', 'pn', 'co', 'd2', 's3', -10);
    assert(r[5], 'c', 'pn', 'co', 'd2', 's4', 0);
    assert(r[6], 'c', 'pn', 'co', 'd3', 's1', 0);
    assert(r[7], 'c', 'pn', 'co', 'd3', 's3', -10);
    assert(r[8], 'c', 'pn', 'co', 'd3', 's4', 0);
    assert(r[9], 'c', 'pn', 'co', 'd4', 's1', 0);
    assert(r[10], 'c', 'pn', 'co', 'd4', 's3', -10);
    assert(r[11], 'c', 'pn', 'co', 'd4', 's4', 0);
  });
  describe('de-duplication', () => {
    it('same', () => {
      const r = decorate(getState(), [
        { domain: 'cnes.isis.sat1', timebarId: 'tb1', timeline: 'TL1', formula: 'c.pn<co>.f' },
        { domain: 'cnes.isis.sat1', timebarId: 'tb1', timeline: 'TL1', formula: 'c.pn<co>.f' },
      ]);
      r.should.be.an('array').with.lengthOf(1);
      assert(r[0], 'c', 'pn', 'co', 'd1', 's1', 0);
    });
    it('handle offset', () => {
      const r = decorate(getState(), [
        { domain: 'cnes.isis.sat1', timebarId: 'tb1', timeline: 'TL1', formula: 'c.pn<co>.f' },
        { domain: 'cnes.isis.sat1', timebarId: 'tb1', timeline: 'TL3', formula: 'c.pn<co>.f' },
      ]);
      r.should.be.an('array').with.lengthOf(2);
      assert(r[0], 'c', 'pn', 'co', 'd1', 's1', 0);
      assert(r[1], 'c', 'pn', 'co', 'd1', 's3', -10);
    });
  });
});
