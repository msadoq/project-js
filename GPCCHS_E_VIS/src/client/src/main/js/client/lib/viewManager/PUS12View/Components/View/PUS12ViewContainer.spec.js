import { shallowRenderSnapshotInReduxForm } from 'common/jest/utils';
import PUS12ViewContainer from './PUS12ViewContainer';

const stubState = {};

const propsStub = {
  serviceApid: 'serviceApid',
  noOfParameterMonitoringDefinition: 'noOfParameterMonitoringDefinition',
  serviceStatus: 'serviceStatus',
  lastUpdateModeServiceStatus: 'lastUpdateModeServiceStatus',
  lastUpdateTimeServiceStatus: 'lastUpdateTimeServiceStatus',
  apids: [{ apidName: 'ORBIT', apidRawValue: '0' }],
};

describe('viewManager/PUS12View/Components/View/PUS12ViewContainer', () => {
  test('snapshot', () => {
    shallowRenderSnapshotInReduxForm(PUS12ViewContainer, propsStub, stubState);
  });
});
