import TimebarFixture from './Timebar';
import SessionsFixture from './Sessions';

const Timelines = [
  {
    id: "Session 1",
    offset: 0,
    kind: "Session",
    sessionId: SessionsFixture[0].id,
    color: '#fa1289',
    timelineId: "gfdqsd-456788",
    timebarId: TimebarFixture.keyId,
  },
  {
    id: "Session 2",
    offset: 1000,
    kind: "Session",
    sessionId: SessionsFixture[0].id,
    color: null,
    timelineId: "gfdqsd-456789",
    timebarId: TimebarFixture.keyId,
  },
];

export default Timelines;
