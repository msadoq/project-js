import { shallowRenderSnapshot } from 'common/jest/utils';
import OnboardAlarmEditorForm from './OnboardAlarmEditorForm';

const propsStub = {
  initialValues: {},
  handleSubmit: () => null,
  pristine: true,
  reset: () => null,
  submitting: true,
  valid: true,
};

describe('OnboardAlarmEditorForm :: render', () => {
  test('snapshot', () => {
    shallowRenderSnapshot(OnboardAlarmEditorForm, propsStub, {});
  });
});
