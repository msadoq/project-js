import { shallowRenderSnapshotInReduxForm } from '../../../common/jest/utils';
import TimelineFieldContainer from './TimelineFieldContainer';

const propsStub = {
  timelineId: 'timeline-id',
  domainId: 'domain-id',
  windowId: 'w1',
};

// we can just pass through the component since we pass dispatch prop directly
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

describe('TimelineFieldContainer :: render', () => {
  test('snapshot', () => {
    shallowRenderSnapshotInReduxForm(TimelineFieldContainer, propsStub, {});
  });
});
