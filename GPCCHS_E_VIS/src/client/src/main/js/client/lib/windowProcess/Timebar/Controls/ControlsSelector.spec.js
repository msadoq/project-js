/* eslint-disable no-unused-expressions */
import { should } from '../../../common/test';
import {
  getMasterTimelineById,
  getTimeSetterMessages,
  getMasterTimelineExists,
  getCurrentSessionExists,
} from './ControlsSelector';

describe('windowProcess:Timebar:Controls:ControlsSelector', () => {
  describe('getMasterTimelineById', () => {
    it('should return master timeline', () => {
      getMasterTimelineById(
        {
          timebars: {
            myId: {
              masterId: 'timeline01',
            },
          },
          timelines: {
            timeline_01: { id: 'timeline01' },
            timeline_02: { id: 'timeline02' },
            timeline_03: { id: 'timeline03' },
          },
          timebarTimelines: {
            myId: ['timeline_01', 'timeline_02'],
          },
        },
        { timebarUuid: 'myId' }
      ).should.eql(
        {
          id: 'timeline01',
        }
      );
    });
    it('should not find master timeline', () => {
      should.not.exist(getMasterTimelineById(
        {
          timebars: {
            myId: {
              masterId: 'timeline04',
            },
          },
          timelines: {
            timeline_01: { id: 'timeline01' },
            timeline_02: { id: 'timeline02' },
            timeline_03: { id: 'timeline03' },
          },
          timebarTimelines: {
            myId: ['timeline_01', 'timeline_02'],
          },
        },
        { timebarUuid: 'myId' }
      ));
    });
    it('no master timeline', () => {
      should.not.exist(getMasterTimelineById(
        {
          timebars: {
            myId: { },
          },
          timelines: {
            timeline_01: { id: 'timeline01' },
            timeline_02: { id: 'timeline02' },
            timeline_03: { id: 'timeline03' },
          },
          timebarTimelines: {
            myId: ['timeline_01', 'timeline_02'],
          },
        },
        { timebarUuid: 'myId' }
      ));
    });
  });
  describe('getMasterTimelineExists', () => {
    it('returns true', () => {
      const state = {
        timebars: {
          myId: {
            masterId: 'timeline01',
          },
        },
        timelines: {
          timeline_01: { id: 'timeline01' },
          timeline_02: { id: 'timeline02' },
          timeline_03: { id: 'timeline03' },
        },
        timebarTimelines: {
          myId: ['timeline_01', 'timeline_02'],
        },
      };
      getMasterTimelineExists(state, { timebarUuid: 'myId' }).should.be.true;
    });
    it('returns false', () => {
      getMasterTimelineExists({}, {}).should.be.false;
    });
  });
  describe('getCurrentSessionExists', () => {
    it('returns false', () => {
      getCurrentSessionExists({}, {}).should.be.false;
    });
    it('returns true', () => {
      const state = {
        timebars: {
          myId: {
            masterId: 'timeline01',
          },
        },
        timelines: {
          timeline_01: { id: 'timeline01', sessionName: 'mySession' },
        },
        timebarTimelines: {
          myId: ['timeline_01'],
        },
        sessions: [
          { id: 1, name: 'mySession' },
        ],
      };
      getCurrentSessionExists(state, { timebarUuid: 'myId' }).should.be.true;
    });
  });
  describe('getTimeSetterMessages', () => {
    const state = {
      messages: {
        'timeSetter-tbuuid': true,
      },
    };
    it('should returns timeSetter messages', () => {
      getTimeSetterMessages(state, { timebarUuid: 'tbuuid' }).should.be.true;
    });
    it('should returns null', () => {
      should.not.exist(getTimeSetterMessages(state, { timebarUuid: 'unknown' }));
    });
  });
});
