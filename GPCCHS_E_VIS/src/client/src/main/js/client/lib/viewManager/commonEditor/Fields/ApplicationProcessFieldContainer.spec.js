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
};

const propsStub = {
  domainName: 'domainId',
  sessionName: 'master',
  viewId: 'view-id',
  pageId: 'page-id',
};
describe('viewManager :: commonEditor :: Fields :: ApplicationProcessFieldContainer', () => {
  test('snapshot', () => {
    shallowRenderSnapshotInReduxForm(ApplicationProcessFieldContainer, propsStub, stubState);
  });
});
