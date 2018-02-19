import { shallowRenderSnapshot } from 'common/jest/utils';
import GroundAlarmEditorForm from './GroundAlarmEditorForm';

const propsStub = {
  initialValues: {},
  handleSubmit: () => null,
  pristine: true,
  reset: () => null,
  submitting: true,
  valid: true,
};

describe('GroundAlarmEditorForm :: render', () => {
  test('snapshot', () => {
    shallowRenderSnapshot(GroundAlarmEditorForm, propsStub, {});
  });
});
