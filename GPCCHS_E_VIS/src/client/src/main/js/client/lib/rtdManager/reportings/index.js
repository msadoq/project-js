import _get from 'lodash/get';
import asyncParallel from 'async/parallel';
import asyncEach from 'async/each';
import asyncMap from 'async/map';
import _isNil from 'lodash/isNil';
import _remove from 'lodash/remove';
import cst from './constants';
import { SDB_NAMESPACE } from '../constants';
import { getTriggers as getMonitoringDataTriggers } from '../monitorings';

export function getShortDescription({ rtd, sessionId, domainId }, reporting, callback) {
  const shortDescription = _get(reporting, 'IsisCommon.NamingAndDescription.ShortDescription');
  callback(null, shortDescription);
}
export function getLongDescription({ rtd, sessionId, domainId }, reporting, callback) {
  const longDescription = _get(reporting, 'IsisCommon.NamingAndDescription.LongDescription');
  callback(null, longDescription);
}
export function getAliases({ rtd, sessionId, domainId }, reporting, callback) {
  const aliases = _get(reporting, 'IsisCommon.NamingAndDescription.Aliases');
  asyncMap(aliases, (alias, done) => {
    done(null, {
      Alias: alias.Alias,
      ContextDomain: alias.ContextDomain,
    });
  }, callback);
}


export function getMonitoringLaws({ rtd, sessionId, domainId }, reporting, callback) {
  const monitoringLaws = {};
  const monitoringFlag = reporting.MonitoringFlag;
  if (monitoringFlag === cst.ALLOWED) {
    monitoringLaws.OnGround = [];
    const specificChecks = reporting.DomainSpecificChecks;
    asyncEach(specificChecks, (sCheck, sCb) => {
      const groundMonitorings = sCheck.ChecksOnGroundMonitoringData;
      asyncEach(groundMonitorings, (gm, gmCb) => {
        const ref = gm.MonitoringData;
        rtd.getCatalogByName(
          ref.TargetCatalog,
          SDB_NAMESPACE,
          ref.TargetItem,
          sessionId,
          domainId,
          (err, monitoring) => {
            if (err || !monitoring) {
              gmCb(err);
              return;
            }
            getMonitoringDataTriggers(
              { rtd, sessionId, domainId },
              monitoring,
              (tErr, triggers) => {
                if (tErr) {
                  // console.log('err', tErr)
                  gmCb(tErr);
                  return;
                }
                monitoringLaws.OnGround.push({
                  Name: ref.TargetItem,
                  DomainApplicability: sCheck.DomainApplicability,
                  Order: gm.Order,
                  Triggers: triggers,
                });
                gmCb();
              }
            );
          }
        );
      }, sCb);
    }, (err) => {
      if (err) {
        // console.log('err2')
        callback(err);
        return;
      }
      callback(null, monitoringLaws);
    });
    return;
  }
  monitoringLaws.OnBoard = [];
  const boardMonitorings = _get(reporting, 'TelemetryParameter.OnBoardMonitoringData');
  asyncEach(boardMonitorings, (ref, cb) => {
    rtd.getCatalogByName(
      ref.TargetCatalog,
      SDB_NAMESPACE,
      ref.TargetItem,
      sessionId,
      domainId,
      (cErr, monitoring) => {
        if (cErr || !monitoring) {
          cb(cErr);
          return;
        }
        getMonitoringDataTriggers({ rtd, sessionId, domainId }, monitoring, (err, triggers) => {
          if (err) {
            cb(err);
            return;
          }
          monitoringLaws.OnBoard.push({
            Name: ref.TargetItem,
            Triggers: triggers,
          });
          cb(null);
        });
      }
    );
  }, (err) => {
    if (err) {
      callback(err);
      return;
    }
    callback(null, monitoringLaws);
  });
}

export function getSignificativityConditions({ rtd, sessionId, domainId }, reporting, callback) {
  asyncEach(reporting.DomainSpecificValidityConditions, (validityCondition, cb) => {
    const expression = validityCondition.ValidityConditionEXPR;
    if (!_isNil(expression)) {
      cb(null, {
        DomainApplicability: validityCondition.DomainApplicability,
        Expression: expression,
      });
      return;
    }
    const validityConditionAlgo = validityCondition.ValidityConditionALGO;
    if (!_isNil(validityConditionAlgo)) {
      cb(null, {
        DomainApplicability: validityCondition.DomainApplicability,
        Algorithm: validityConditionAlgo,
      });
      return;
    }
    cb(null);
  }, (err, conditions) => {
    callback(null, _remove(conditions, undefined));
  });
}

const getDefaultInterpretationFunction = ({ rtd, sessionId, domainId }, reporting, callback) => {
  const defaultFunction = _get(reporting, 'TelemetryParameter.DefaultInterpretationFunction');
  callback(null, defaultFunction);
};

const getConditionalInterpretationFunctions =
  ({ rtd, sessionId, domainId }, reporting, callback) => {
    const condFunctions = _get(reporting, 'TelemetryParameter.ConditionalInterpretationFunctions');
    asyncMap(condFunctions, (condFunc, cb) => {
      const intFunction = condFunc.InterpretationFunction;
      const selectionCondition = condFunc.SelectionCondition;
      if (_isNil(intFunction) || _isNil(selectionCondition)) {
        cb(null);
        return;
      }
      cb(null, {
        Order: condFunc.Order,
        SelectionCondition: selectionCondition,
        Function: intFunction,
      });
    }, callback);
  };

export function getCalibrationFunctions({ rtd, sessionId, domainId }, reporting, callback) {
  asyncParallel([
    cb => getDefaultInterpretationFunction({ rtd, sessionId, domainId }, reporting, cb),
    cb => getConditionalInterpretationFunctions({ rtd, sessionId, domainId }, reporting, cb),
  ], (err, [defaultFunc, condFuncs]) => {
    if (err) {
      callback(err);
      return;
    }
    callback(null, {
      DefaultInterpretationFunction: defaultFunc, ConditionalInterpretationFunctions: condFuncs });
  });
}

export function getTMPackets({ rtd, sessionId, domainId }, reporting, callback) {
  // TODO check ParameterAggregation catalog
  callback(null);
}

export function getComputingDefinitions({ rtd, sessionId, domainId }, reporting, callback) {
  // TODO
  callback(null);
}

export function getComputedParameterFormula({ rtd, sessionId, domainId }, reporting, callback) {
  const script = _get(reporting, 'SyntheticParameter.Script');
  if (!_isNil(script)) {
    callback(null, script);
    return;
  }
  const algo = _get(reporting, 'SyntheticParameter.CallToAlgorithm.Algorithm');
  if (!_isNil(algo)) {
    callback(null, algo);
    return;
  }
  callback(null);
}

export function getComputedParameterTriggers({ rtd, sessionId, domainId }, reporting, callback) {
  const triggeringReportingData = _get(reporting, 'SyntheticParameter.TriggeringReportingData');
  callback(null, triggeringReportingData);
}
