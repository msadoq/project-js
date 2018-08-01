import { shallowRenderSnapshotInReduxForm } from 'common/jest/utils';
import PUS13ViewContainer from './PUS13ViewContainer';

const stubState = {};

const propsStub = {
  serviceApid: 'serviceApid',
  noOfParameterMonitoringDefinition: 'noOfParameterMonitoringDefinition',
  serviceStatus: 'serviceStatus',
  lastUpdateModeServiceStatus: 'lastUpdateModeServiceStatus',
  lastUpdateTimeServiceStatus: 'lastUpdateTimeServiceStatus',
  apids: [{ apidName: 'ORBIT', apidRawValue: '0' }],
};

describe('viewManager/PUS13View/Components/View/PUS13ViewContainer', () => {
  test('snapshot', () => {
    shallowRenderSnapshotInReduxForm(PUS13ViewContainer, propsStub, stubState);
  });
});
