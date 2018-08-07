import pus12DataReducer
  // { isExpectedValue, getELData, getHData,
  // selectExpectedData, bindToBoolKey }
  from 'viewManager/PUS12View/store/dataReducer';
import { INJECT_PUS_DATA } from '../../../store/types';

describe('viewManager/PUS12View/store/dataReducer', () => {
  it('should sort expected values and replace constants', () => {
    const state = {
      PUS12ViewData: {},
    };
    const action = {
      type: INJECT_PUS_DATA,
      payload: {
        viewId: 'PUS12View',
        data: {
          PUS12View: {
            foo: 'foo',
            bar: 'bar',
            serviceStatus: 1,
            lastUpdateModeServiceStatus: 1,
            pus012ParameterMonitoringDefinition: [
              {
                baz: 'baz',
                monitoringStatus: 2,
                monitoringInterval: 100,
                repetitionNumber: 100,
                checkType: '2',
                isMonitoringIntervalSet: true,
                isRepetitionNumberSet: true,
                lastUpdateModeMonInterval: 1,
                lastUpdateModeRepetition: 2,
                validityParameterId: 100,
                validityParameterName: 'mySTRING',
                validityParameterMask: 'mySTRING',
                validityParameterExpectedValue: 'mySTRING',
                lastUpdateModeMonId: 2,
                lastUpdateModeParamId: 2,
                lastUpdateModeValParamId: 2,
                lastUpdateModeValParamExpectValue: 2,
                lastUpdateModeValParamMask: 2,
                lastUpdateModeCheckType: 2,
                lastUpdateModeMonStatus: 2,
                lastUpdateModeProtectionStatus: 2,
                pus012MonitoringCheckPropertiesLow: {
                  rid: 100,
                  ridLabel: 'mySTRING',
                  ridStatus: 1,
                  actionStatus: 1,
                  actionName: 'mySTRING',
                  mask: 'mySTRING',
                  value: 'mySTRING',
                  lastUpdateModeRid: 2,
                  lastUpdateModeActionStatus: 2,
                  lastUpdateModeRidStatus: 2,
                  lastUpdateModeMask: 2,
                  lastUpdateModeValue: 2,
                },
                pus012MonitoringCheckPropertiesHigh: {
                  rid: 100,
                  ridLabel: 'mySTRING',
                  ridStatus: 1,
                  actionStatus: 1,
                  actionName: 'mySTRING',
                  mask: 'mySTRING',
                  value: 'mySTRING',
                  lastUpdateModeRid: 2,
                  lastUpdateModeActionStatus: 2,
                  lastUpdateModeRidStatus: 2,
                  lastUpdateModeMask: 2,
                  lastUpdateModeValue: 2,
                },
                pus012MonitoringCheckPropertiesExpected: {
                  rid: 100,
                  ridLabel: 'mySTRING',
                  ridStatus: 1,
                  actionStatus: 2,
                  actionName: 'mySTRING',
                  mask: 'mySTRING',
                  value: 'mySTRING',
                  lastUpdateModeRid: 2,
                  lastUpdateModeActionStatus: 2,
                  lastUpdateModeRidStatus: 2,
                  lastUpdateModeMask: 2,
                  lastUpdateModeValue: 2,
                },
              },
              {
                baz: 'baz',
                monitoringStatus: 1,
                checkType: '1',
                monitoringInterval: 100,
                repetitionNumber: 100,
                isMonitoringIntervalSet: false,
                isRepetitionNumberSet: false,
                lastUpdateModeMonInterval: 1,
                lastUpdateModeRepetition: 1,
                validityParameterId: 100,
                validityParameterName: 'mySTRING',
                validityParameterMask: 'mySTRING',
                validityParameterExpectedValue: 'mySTRING',
                lastUpdateModeMonId: 1,
                lastUpdateModeParamId: 1,
                lastUpdateModeValParamId: 1,
                lastUpdateModeValParamExpectValue: 1,
                lastUpdateModeValParamMask: 1,
                lastUpdateModeCheckType: 1,
                lastUpdateModeMonStatus: 1,
                lastUpdateModeProtectionStatus: 1,
                pus012MonitoringCheckPropertiesLow: {
                  rid: 100,
                  ridLabel: 'mySTRING',
                  ridStatus: 1,
                  actionStatus: 2,
                  actionName: 'mySTRING',
                  mask: 'mySTRING',
                  value: 'mySTRING',
                  lastUpdateModeRid: 1,
                  lastUpdateModeActionStatus: 1,
                  lastUpdateModeRidStatus: 1,
                  lastUpdateModeMask: 1,
                  lastUpdateModeValue: 1,
                },
                pus012MonitoringCheckPropertiesHigh: {
                  rid: 100,
                  ridLabel: 'mySTRING',
                  ridStatus: 2,
                  actionStatus: 1,
                  actionName: 'mySTRING',
                  mask: 'mySTRING',
                  value: 'mySTRING',
                  lastUpdateModeRid: 2,
                  lastUpdateModeActionStatus: 2,
                  lastUpdateModeRidStatus: 2,
                  lastUpdateModeMask: 2,
                  lastUpdateModeValue: 2,
                },
                pus012MonitoringCheckPropertiesExpected: {
                  rid: 100,
                  ridLabel: 'mySTRING',
                  ridStatus: 1,
                  actionStatus: 1,
                  actionName: 'mySTRING',
                  mask: 'mySTRING',
                  value: 'mySTRING',
                  lastUpdateModeRid: 1,
                  lastUpdateModeActionStatus: 1,
                  lastUpdateModeRidStatus: 1,
                  lastUpdateModeMask: 1,
                  lastUpdateModeValue: 1,
                },
              },
            ],
          },
        },
      },
    };
    expect(pus12DataReducer(state, action)).toEqual({
      PUS12ViewData: {
        foo: 'foo',
        bar: 'bar',
        serviceStatus: 'DISABLED',
        lastUpdateModeServiceStatus: 'TC',
        tables: {
          parameterMonitoringDefinitions: {
            data: [
              {
                baz: 'baz',
                monitoringStatus: 'ENABLED',
                monitoringInterval: 100,
                repetitionNumber: 100,
                lastUpdateModeMonInterval: 'TC',
                lastUpdateModeRepetition: 'TM',
                checkType: 'EXPECTED VALUE',
                validityParameterId: 100,
                validityParameterName: 'mySTRING',
                validityParameterMask: 'mySTRING',
                validityParameterExpectedValue: 'mySTRING',
                lastUpdateModeMonId: 'TM',
                lastUpdateModeParamId: 'TM',
                lastUpdateModeValParamId: 'TM',
                lastUpdateModeValParamExpectValue: 'TM',
                lastUpdateModeValParamMask: 'TM',
                lastUpdateModeCheckType: 'TM',
                lastUpdateModeMonStatus: 'TM',
                lastUpdateModeProtectionStatus: 'TM',
                ridEL: 100,
                ridLabelEL: 'mySTRING',
                ridStatusEL: 'DISABLED',
                actionStatusEL: 'ENABLED',
                actionNameEL: 'mySTRING',
                maskEL: 'mySTRING',
                valueEL: 'mySTRING',
                lastUpdateModeRidEL: 'TM',
                lastUpdateModeActionStatusEL: 'TM',
                lastUpdateModeRidStatusEL: 'TM',
                lastUpdateModeMaskEL: 'TM',
                lastUpdateModeValueEL: 'TM',
                ridH: '',
                ridLabelH: '',
                ridStatusH: '',
                actionStatusH: '',
                actionNameH: '',
                maskH: '',
                valueH: '',
                lastUpdateModeRidH: '',
                lastUpdateModeActionStatusH: '',
                lastUpdateModeRidStatusH: '',
                lastUpdateModeMaskH: '',
                lastUpdateModeValueH: '',
              },
              {
                baz: 'baz',
                monitoringStatus: 'DISABLED',
                checkType: 'DELTA',
                monitoringInterval: '',
                repetitionNumber: '',
                lastUpdateModeMonInterval: 1,
                lastUpdateModeRepetition: 1,
                validityParameterId: '',
                validityParameterName: '',
                validityParameterMask: '',
                validityParameterExpectedValue: '',
                lastUpdateModeValParamId: 1,
                lastUpdateModeValParamExpectValue: 1,
                lastUpdateModeValParamMask: 1,
                lastUpdateModeMonId: 'TC',
                lastUpdateModeParamId: 'TC',
                lastUpdateModeCheckType: 'TC',
                lastUpdateModeMonStatus: 'TC',
                lastUpdateModeProtectionStatus: 'TC',
                maskEL: 'mySTRING',
                ridEL: 100,
                ridLabelEL: 'mySTRING',
                ridStatusEL: 'DISABLED',
                valueEL: 'mySTRING',
                actionNameEL: 'mySTRING',
                actionStatusEL: 'ENABLED',
                lastUpdateModeRidEL: 'TC',
                lastUpdateModeActionStatusEL: 'TC',
                lastUpdateModeRidStatusEL: 'TC',
                lastUpdateModeMaskEL: 'TC',
                lastUpdateModeValueEL: 'TC',
                ridH: 100,
                ridLabelH: 'mySTRING',
                ridStatusH: 'ENABLED',
                valueH: 'mySTRING',
                maskH: 'mySTRING',
                lastUpdateModeMaskH: 'TM',
                lastUpdateModeRidH: 'TM',
                lastUpdateModeActionStatusH: 'TM',
                lastUpdateModeRidStatusH: 'TM',
                lastUpdateModeValueH: 'TM',
                actionNameH: 'mySTRING',
                actionStatusH: 'DISABLED',
              },
            ],
            keep: [0, 1],
          },
        },
      },
    });
  });
});
