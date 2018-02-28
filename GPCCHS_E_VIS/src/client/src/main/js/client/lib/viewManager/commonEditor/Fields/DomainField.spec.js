import DomainField from 'viewManager/commonEditor/Fields/DomainField';
import { shallowRenderSnapshotInReduxForm } from '../../../common/jest/utils';

const propsStub = {
  domainName: 'domain',
  domains: [{
    name: 'DomainFieldName',
    items: [],
  }],
  onChange: () => {},
};
describe('viewManager', () => {
  describe('viewManager :: commonEditor', () => {
    describe('viewManager :: commonEditor :: Fields', () => {
      describe('viewManager :: commonEditor :: Fields :: DomainField', () => {
        test('snapshot', () => {
          shallowRenderSnapshotInReduxForm(DomainField, propsStub, {});
        });
      });
    });
  });
});
