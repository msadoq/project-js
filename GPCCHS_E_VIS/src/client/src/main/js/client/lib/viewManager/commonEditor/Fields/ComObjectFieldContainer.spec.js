import ComObjectFieldContainer from './ComObjectFieldContainer';
import { shallowRenderSnapshotInReduxForm } from '../../../common/jest/utils';

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
      describe('viewManager :: commonEditor :: Fields :: ComObjectFieldContainer', () => {
        test('snapshot', () => {
          shallowRenderSnapshotInReduxForm(ComObjectFieldContainer, propsStub, {});
        });
      });
    });
  });
});
