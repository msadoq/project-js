import asyncParallel from 'async/parallel';
import { SDB_NAMESPACE } from './constants';
import {
  getShortDescription,
  getLongDescription,
  getAliases,
  getMonitoringLaws,
  getSignificativityConditions,
  getCalibrationFunctions,
  getTMPackets,
  getComputingDefinitions,
  getComputedParameterFormula,
  getComputedParameterTriggers,
} from './reportings';

export default function getTelemetryStaticElements(
  { rtd, sessionId, domainId }, parameterName, callback) {
  rtd.getCatalogByName('Reporting', SDB_NAMESPACE, parameterName, sessionId, domainId, (err, reporting) => {
    if (err || !reporting) {
      callback(err);
      return;
    }
    asyncParallel([
      cb => getShortDescription({ rtd, sessionId, domainId }, reporting, cb),
      cb => getLongDescription({ rtd, sessionId, domainId }, reporting, cb),
      cb => getAliases({ rtd, sessionId, domainId }, reporting, cb),
      cb => getMonitoringLaws({ rtd, sessionId, domainId }, reporting, cb),
      cb => getSignificativityConditions({ rtd, sessionId, domainId }, reporting, cb),
      cb => getCalibrationFunctions({ rtd, sessionId, domainId }, reporting, cb),
      cb => getTMPackets({ rtd, sessionId, domainId }, reporting, cb),
      cb => getComputingDefinitions({ rtd, sessionId, domainId }, reporting, cb),
      cb => getComputedParameterFormula({ rtd, sessionId, domainId }, reporting, cb),
      cb => getComputedParameterTriggers({ rtd, sessionId, domainId }, reporting, cb),
    ], (pErr, [
      shortDescription,
      longDescription,
      aliases,
      monitoringLaws,
      significativityConditions,
      calibrationFunctions,
      telemetryPackets,
      computingDefinitions,
      formula,
      triggers,
    ]) => {
      if (pErr) {
        callback(pErr);
        return;
      }
      callback(null, {
        parameterName,
        shortDescription,
        longDescription,
        aliases,
        monitoringLaws,
        significativityConditions,
        calibrationFunctions,
        telemetryPackets,
        computingDefinitions,
        formula,
        triggers,
      });
    });
  });
}
