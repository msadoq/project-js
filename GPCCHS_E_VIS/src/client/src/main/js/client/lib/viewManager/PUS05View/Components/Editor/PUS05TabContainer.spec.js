import GroundAlarmTabContainer from 'viewManager/GroundAlarmView/Components/Editor/GroundAlarmTabContainer';
import { shallowRenderSnapshotInReduxForm } from 'common/jest/utils';
import stateTest from 'common/jest/stateTest';

const propsStub = {

};

describe('GroundAlarmTabContainer :: render', () => {
  test('snapshot', () => {
    shallowRenderSnapshotInReduxForm(GroundAlarmTabContainer, propsStub, stateTest);
  });
});

