import { shallowRenderSnapshotInReduxForm } from '../../../common/jest/utils';
import SessionFieldContainer from './SessionFieldContainer';

const propsStub = {
  timelineId: 'timeline-id',
  sessionId: 'session-id',
};

describe('viewManager', () => {
  describe('viewManager :: commonEditor', () => {
    describe('viewManager :: commonEditor :: Fields', () => {
      describe('viewManager :: commonEditor :: Fields :: SessionFieldContainer', () => {
        test('snapshot', () => {
          shallowRenderSnapshotInReduxForm(SessionFieldContainer, propsStub, {});
        });
      });
    });
  });
});
