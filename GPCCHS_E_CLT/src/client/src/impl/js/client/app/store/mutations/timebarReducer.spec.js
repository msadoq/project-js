import { getSessionIdsByWildcard } from './timebarReducer';
import { should, getStore } from '../../utils/test';

describe('timebarReducer', () => {
  let state;
  before(() => {
    const { getState } = getStore({ timebars: {
      tb1: {
        uuid: 'id1',
        timelines: [
          'tl1',
          'tl2',
        ]
      },
      tb2: {
        uuid: 'id2',
        timelines: [
          'tl3',
        ]
      },
    },
    timelines: [{
      uuid: 'tl1',
      id: 'session1',
      sessionId: 100,
    }, {
      uuid: 'tl2',
      id: 'session20',
      sessionId: 101,
    }, {
      uuid: 'tl3',
      id: 'session10',
      sessionId: 102
    }]
   });
    state = getState();
  });
  describe('getSessionIdsByWildcard', () => {
    it('wildcard ok', () => {
      const sId = getSessionIdsByWildcard(state, 'tb1', 'session1*');
      sId.should.be.an('array').with.length(1);
      sId[0].should.equal(100);
    });
    it('wildcard nok', () => {
      const sId = getSessionIdsByWildcard(state, 'tb1', 'notSession*');
      sId.should.be.an('array').with.length(0);
    });
    it('no wildcard', () => {
      const sId = getSessionIdsByWildcard(state, 'tb1', 'session20');
      sId.should.be.an('array').with.length(1);
      sId[0].should.equal(101);
    });
    it('no wildcard but invalid', () => {
      const sId = getSessionIdsByWildcard(state, 'tb1', 'session');
      sId.should.be.an('array').with.length(0);
    });
    it('wildcard *', () => {
      const sId = getSessionIdsByWildcard(state, 'tb1', '*');
      sId.should.be.an('array').with.length(2);
      sId[0].should.equal(100);
      sId[1].should.equal(101);
    });
    it('wildcard * in middle', () => {
      const sId = getSessionIdsByWildcard(state, 'tb1', 'se*sion1');
      sId.should.be.an('array').with.length(1);
      sId[0].should.equal(100);
    });
    it('wildcard ?', () => {
      const sId = getSessionIdsByWildcard(state, 'tb1', 'session?');
      sId.should.be.an('array').with.length(1);
      sId[0].should.equal(100);
    });
    it('wildcard ? invalid', () => {
      const sId = getSessionIdsByWildcard(state, 'tb1', 's??n*');
      sId.should.be.an('array').with.length(0);
    });
  });
});
