import TimebarFixture from './Timebar';
import SessionsFixture from './Sessions';

const Timelines = [
  {
    id: 'Session 1',
    offset: 200,
    kind: 'Session',
    sessionId: SessionsFixture[0].id,
    color: '#fa1289',
    timelineUuid: 'gfdqsd-456788',
    timebarUuid: TimebarFixture.timebarUuid,
  },
  {
    id: 'Session 2',
    offset: 1000,
    kind: 'Session',
    sessionId: SessionsFixture[0].id,
    color: null,
    timelineUuid: 'gfdqsd-456789',
    timebarUuid: TimebarFixture.timebarUuid,
  },
];

export default Timelines;
