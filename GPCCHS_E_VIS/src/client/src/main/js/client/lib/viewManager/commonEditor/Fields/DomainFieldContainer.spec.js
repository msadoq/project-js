import { shallowRenderSnapshotInReduxForm } from 'common/jest/utils';
import DomainFieldContainer from './DomainFieldContainer';

const propsStub = {
  timelineId: 'timeline-id',
  domainId: 'domain-id',
};

// // we can just pass through the component since we pass dispatch prop directly
// jest.mock('redux-form', () => ({
//   Field: 'Field',
//   reduxForm: options => (
//     Form => (props) => {
//       if (options.validate) {
//         options.validate({}, props);
//       }
//
//       return <Form {...props} />;
//     }
//   ),
// }));

describe('viewManager', () => {
  describe('viewManager :: commonEditor', () => {
    describe('viewManager :: commonEditor :: Fields', () => {
      describe('viewManager :: commonEditor :: Fields :: DomainFieldContainer', () => {
        test('snapshot', () => {
          shallowRenderSnapshotInReduxForm(DomainFieldContainer, propsStub, {});
        });
      });
    });
  });
});
