import SessionField from 'viewManager/commonEditor/Fields/SessionField';
import { shallowRenderSnapshotInReduxForm } from '../../../common/jest/utils';

const propsStub = {
  sessions: [{
    name: 'SessionFieldName',
    items: [],
  }],
  onChange: () => {},
};
describe('viewManager', () => {
  describe('viewManager :: commonEditor', () => {
    describe('viewManager :: commonEditor :: Fields', () => {
      describe('viewManager :: commonEditor :: Fields :: SessionField', () => {
        test('snapshot', () => {
          shallowRenderSnapshotInReduxForm(SessionField, propsStub, {});
        });
      });
    });
  });
});
