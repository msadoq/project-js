import DefaultPusDataContainer from './DefaultPusDataContainer';
import { shallowRenderSnapshotInReduxForm } from '../../common/jest/utils';

const stubState = {
  form: {
    'form-name': {
      initial: {
        connectedData: {
          domain: 'fr',
          session: 'Master',
        },
      },
      values: {
        connectedData: {
          domain: 'fr',
          session: 'Master',
        },
      },
    },
  },
};

const propsStub = {
  form: 'form-name',
};
describe('viewManager :: commonEditor :: Fields :: DefaultPusDataContainer', () => {
  test('snapshot', () => {
    shallowRenderSnapshotInReduxForm(DefaultPusDataContainer, propsStub, stubState);
  });
});
