import ApplicationProcessFieldContainer from './ApplicationProcessFieldContainer';
import { shallowRenderSnapshotInReduxForm } from '../../../common/jest/utils';

const stubState = {
  domains: [
    {
      domainId: 13214,
    },
  ],
  sessions: [
    {
      name: 'master',
      id: 1321,
    },
  ],
  timelines: {
    tl1: {
      color: null,
      id: 'Session 1',
      kind: 'Session',
      offset: 0,
      sessionName: 'Master',
      uuid: 'tl1',
    },
  }
};

const propsStub = {
  domainName: 'domainId',
  timelineId: 'tl1',
  viewId: 'view-id',
  pageId: 'page-id',
};
describe('viewManager :: commonEditor :: Fields :: ApplicationProcessFieldContainer', () => {
  test('snapshot', () => {
    shallowRenderSnapshotInReduxForm(ApplicationProcessFieldContainer, propsStub, stubState);
  });
});
