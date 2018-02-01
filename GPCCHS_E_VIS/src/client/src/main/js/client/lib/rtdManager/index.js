// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #3622 : 07/03/2017 : first draft on inspector: retrieve data from rtd on right-click
// VERSION : 1.1.2 : DM : #5822 : 15/03/2017 : add a tree component and format inspector data to be consumed
// VERSION : 1.1.2 : DM : #5822 : 15/03/2017 : add styles for the inspector
// VERSION : 1.1.2 : DM : #5822 : 24/03/2017 : inspector view: separate general data from specific TM data
// VERSION : 1.1.2 : DM : #5828 : 11/05/2017 : remove use of sinon for rtd stub
// VERSION : 1.1.2 : FA : #6762 : 02/06/2017 : RTD can now be disabled using RTD_ON in config
// VERSION : 1.1.2 : DM : #5828 : 14/06/2017 : Move common/log and common/parameters in client/
// VERSION : 1.1.2 : FA : ISIS-FT-1939 : 05/07/2017 : create rtdManager function to retrieve unit
// VERSION : 1.1.2 : FA : #7145 : 24/07/2017 : Use rtdManager as dependency injection in inspector middleware
// VERSION : 1.1.2 : DM : #6700 : 03/08/2017 : Merge branch 'dev' into dbrugne-data
// END-HISTORY
// ====================================================================

import asyncParallel from 'async/parallel';
import { get } from '../common/configurationManager';
import { SDB_NAMESPACE } from './constants';
import {
  getUnit,
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

export prepareDataToTree from './prepareDataToTree';

let rtd;
const disabledRtd = {
  getCatalogByName: (a, b, c, d, e, cb) => cb(null),
};

export function setRtd(rtdApi) {
  rtd = rtdApi;
}

export function getRtd() {
  return get('RTD_ON') === 'on' ? rtd : disabledRtd;
}

export function getTelemetryUnit(
  { sessionId, domainId }, parameterName, callback) {
  getRtd().getCatalogByName('Reporting', SDB_NAMESPACE, parameterName, sessionId, domainId, (err, reporting) => {
    if (err || !reporting) {
      callback(err);
      return;
    }
    getUnit({ rtd, sessionId, domainId }, reporting, callback);
  });
}


export function getTelemetryStaticElements(
  { sessionId, domainId }, parameterName, callback) {
  getRtd().getCatalogByName('Reporting', SDB_NAMESPACE, parameterName, sessionId, domainId, (err, reporting) => {
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
      shortDesc,
      longDesc,
      aliases,
      monitoringLaws,
      signifConds,
      calibFuncs,
      tmPackets,
      computingDefs,
      formula,
      triggers,
    ]) => {
      if (pErr) {
        callback(pErr);
        return;
      }

      callback(null, {
        ShortDescription: shortDesc,
        LongDescription: longDesc,
        Aliases: aliases,
        MonitoringLaws: monitoringLaws,
        SignificativityConditions: signifConds,
        CalibrationFunctions: calibFuncs,
        TelemetryPackets: tmPackets,
        ComputingDefinitions: computingDefs,
        Formula: formula,
        Triggers: triggers,
      });
    });
  });
}
