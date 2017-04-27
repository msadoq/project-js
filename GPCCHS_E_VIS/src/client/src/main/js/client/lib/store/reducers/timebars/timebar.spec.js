/* eslint no-unused-expressions: 0 */
import __ from 'lodash/fp';
import { freezeArgs } from '../../../common/test';
import * as actions from '../../actions/timebars';
import timebarsReducer from '../timebars';
import * as types from '../../types';

const reducer = freezeArgs(timebarsReducer);

describe('store:timebars:reducer', () => {
  describe('update', () => {
    const tbState = {
      tb1: {
        id: 'tb1',
        visuWindow: {
          lower: 200,
          upper: 400,
          current: 300,
          defaultWidth: 200,
        },
        slideWindow: { lower: 250, upper: 350 },
        rulerStart: 0,
        rulerResolution: 100,
        speed: 10,
        realTime: false,
        mode: 'Normal',
        masterId: 'OtherId',
        timelines: ['myTimelineId', 'myTimelineId3'],
      },
    };
    it('id', () => {
      const newState = reducer(tbState, actions.updateId('tb1', 'newId'));
      newState.should.have.property('tb1');
      newState.tb1.should.have.property('id');
      newState.tb1.id.should.equal('newId');
    });
    it('slideWindow', () => {
      const action = {
        type: types.WS_TIMEBAR_UPDATE_CURSORS,
        payload: {
          slideWindow: { lower: 250, upper: 42 },
          timebarUuid: 'tb1',
        },
      };
      const newState = reducer(tbState, action);

      // visuWindow
      newState.tb1.visuWindow.should.be.eql(tbState.tb1.visuWindow);

      // slideWindow
      newState.tb1.slideWindow.lower.should.be.eql(250);
      newState.tb1.slideWindow.upper.should.be.eql(42);
    });
    it('visuWindow', () => {
      const action = {
        type: types.WS_TIMEBAR_UPDATE_CURSORS,
        payload: {
          visuWindow: { lower: 1, upper: 2, current: 3 },
          timebarUuid: 'tb1',
        },
      };
      const newState = reducer(tbState, action);


      // visuWindow
      newState.tb1.visuWindow.lower.should.be.eql(1);
      newState.tb1.visuWindow.upper.should.be.eql(2);
      newState.tb1.visuWindow.current.should.be.eql(3);

      // slideWindow
      newState.tb1.slideWindow.should.be.eql(tbState.tb1.slideWindow);
    });
    it('empty visuWindow/slideWindow', () => {
      const action = {
        type: types.WS_TIMEBAR_UPDATE_CURSORS,
        payload: {
          visuWindow: { },
          slideWindow: { },
          timebarUuid: 'tb1',
        },
      };
      reducer(tbState, action).should.deep.eql(tbState);
    });
    it('should be immutable with same data', () => {
      const action = {
        type: types.WS_TIMEBAR_UPDATE_CURSORS,
        payload: {
          timebarUuid: 'tb1',
          visuWindow: { lower: 5, upper: 40, current: 30 },
        },
      };
      const newState = reducer(tbState, action);
      reducer(newState, action).should.equal(newState);
    });
    it('speed', () => {
      const action = {
        type: types.WS_TIMEBAR_SPEED_UPDATE,
        payload: {
          timebarUuid: 'tb1',
          speed: 20,
        },
      };
      const newState = reducer(tbState, action);
      newState.tb1.speed.should.be.eql(20);
    });
    it('defaultWidth', () => {
      const newState = reducer(tbState, actions.updateDefaultWidth('tb1', 10005));
      newState.should.have.property('tb1');
      newState.tb1.should.have.property('visuWindow');
      newState.tb1.visuWindow.should.have.property('defaultWidth');
      newState.tb1.visuWindow.defaultWidth.should.equal(10005);
    });
    it('masterId', () => {
      const newState = reducer(tbState, actions.updateMasterId('tb1', 'myTlId'));
      newState.should.have.property('tb1');
      newState.tb1.should.have.property('masterId');
      newState.tb1.masterId.should.equal('myTlId');
    });
    it('realTime', () => {
      const newState = reducer(tbState, actions.setRealTime('tb1', true));
      newState.should.have.property('tb1');
      newState.tb1.should.have.property('realTime');
      newState.tb1.realTime.should.equal(true);
    });
    it('updates rulerStart and rulerResolution', () => {
      const removeRulerProperties = __.update('tb1', __.omit(['rulerStart', 'rulerResolution']));
      const newState = reducer(tbState, actions.updateViewport('tb1', 42, 42));
      newState.tb1.rulerStart.should.be.eql(42);
      newState.tb1.rulerResolution.should.be.eql(42);
      removeRulerProperties(tbState).should.be.eql(removeRulerProperties(newState));
    });
  });
  describe('switch modes', () => {
    const state = {
      tb1: {
        id: 'tb1',
        visuWindow: {
          lower: 200,
          upper: 400,
          current: 300,
          defauttWidth: 600,
        },
        slideWindow: { lower: 250, upper: 350 },
      },
    };
    it('switch mode', () => {
      const action = {
        type: types.WS_TIMEBAR_MODE_UPDATE,
        payload: { timebarUuid: 'tb1', mode: 'yolo' },
      };
      const newState = reducer(state, action);
      newState.tb1.mode.should.be.eql('yolo');
    });
  });
});
