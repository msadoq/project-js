import _isNil from 'lodash/isNil';
import cst from './constants';

/* eslint-disable complexity, "DV6 TBC_CNES Redux reducers should be implemented as switch case" */
function getTriggers({ rtd, sessionId, domainId }, monitoring, callback) {
  const monitoringType = monitoring.MonitoringType;
  switch (monitoringType) {
    case cst.ON_BOARD: {
      const onBoardCheck = monitoring.OnBoardCheck;
      if (_isNil(onBoardCheck)) {
        callback(null);
        return;
      }
      const checkType = onBoardCheck.CheckType;
      switch (checkType) {
        case cst.ON_BOARD_DELTA_CHECK:
        case cst.ON_BOARD_LIMIT_CHECK: {
          const check = onBoardCheck.OnBoardLimitorDeltaCheck;
          if (_isNil(check)) {
            callback(null);
            return;
          }
          callback(null, {
            MonitoringType: monitoringType,
            CheckType: checkType,
            LowLimit: {
              Value: check.LowLimitValue,
              Event: check.LowLimitEvent,
            },
            HighLimit: {
              Value: check.HighLimitValue,
              Event: check.HighLimitEvent,
            },
          });
          break;
        }
        case cst.ON_BOARD_EXPECTED_VALUE_CHECK: {
          const check = onBoardCheck.OnBoardExpectedValueCheck;
          if (_isNil(check)) {
            callback(null);
            return;
          }
          callback(null, {
            MonitoringType: monitoringType,
            CheckType: checkType,
            Mask: check.Mask,
            ExpectedValue: check.ExpectedValue,
            Event: check.Event,
          });
          break;
        }
        default:
          callback(new Error('Wrong value for CheckType'));
      }
      break;
    }
    case cst.FUNCTIONAL: {
      const functionalCheck = monitoring.OnBoardFunctionalMonitoring;
      if (_isNil(functionalCheck)) {
        callback(null);
        return;
      }
      callback(null, {
        MonitoringType: monitoringType,
        Checks: functionalCheck.Checks,
        Event: functionalCheck.EventReport,
      });
      break;
    }
    case cst.ON_GROUND: {
      const groundCheck = monitoring.OnGroundCheck;
      if (_isNil(groundCheck)) {
        callback(null);
        return;
      }
      const checkType = groundCheck.GroundCheckType;
      switch (checkType) {
        case cst.ON_GROUND_LIMIT_CHECK: {
          const limitCheck = groundCheck.LimitCheck;
          if (_isNil(limitCheck)) {
            callback(null);
            return;
          }
          callback(null, {
            MonitoringType: monitoringType,
            CheckType: checkType,
            LowerLimits: limitCheck.LowerLimits,
            UpperLimits: limitCheck.UpperLimits,
          });
          break;
        }
        case cst.ON_GROUND_MAXIMUM_DELTA_CHECK:
        case cst.ON_GROUND_MINIMUM_DELTA_CHECK: {
          const deltaCheck = groundCheck.DeltaCheck;
          if (_isNil(deltaCheck)) {
            callback(null);
            return;
          }
          callback(null, {
            MonitoringType: monitoringType,
            CheckType: checkType,
            Threshold: deltaCheck.Threshold,
            AlarmLevel: deltaCheck.AlarmLevel,
          });
          break;
        }
        case cst.ON_GROUND_EXPECTED_VALUE_CHECK: {
          const expectedCheck = groundCheck.ExpectedStateCheck;
          if (_isNil(expectedCheck)) {
            callback(null);
            return;
          }
          callback(null, {
            MonitoringType: monitoringType,
            CheckType: checkType,
            Value: expectedCheck.Value,
            ReferenceValues: expectedCheck.RefValue,
            ValueCheckType: expectedCheck.CheckType,
            AlarmLevel: expectedCheck.AlarmLevel,
          });
          break;
        }
        default:
          callback(new Error('Wrong value for CheckType'));
      }
      break;
    }
    default:
      callback(new Error('Wrong value for MonitoringType'));
  }
}

export default { getTriggers };
