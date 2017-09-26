// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #6835 : 12/09/2017 : PlotView parses entryPoints differently depending on entryPoints being parametric or not.
// END-HISTORY
// ====================================================================

import { get } from '../../common/configurationManager';
import formulaParser from './formula';
import domainsFilter from './domains';
import sessionsFilter from './sessions';
import timelinesFilter from './timelines';

export default function parseConnectedDataParametric(
  domains,
  sessions,
  timelines,
  connectedData,
  connectedDataParametric,
  masterSessionId,
  viewDomain,
  pageDomain,
  workspaceDomain,
  viewSessionName,
  pageSessionName,
  workspaceSessionName
) {
  const dataId = {};
  const { formulaX, domainX, formulaY, domainY, filter } = connectedDataParametric;
  const { timeline } = connectedData;

  // =======
  // Session
  // =======
  const timelineSearch = timelinesFilter(timelines, timeline);
  if (timelineSearch.error) {
    return timelineSearch;
  }
  const { sessionName, offset } = timelineSearch;
  const session = sessionsFilter(
    sessions,
    sessionName,
    masterSessionId,
    viewSessionName,
    pageSessionName,
    workspaceSessionName
  );
  if (session.error) {
    return session;
  }

  // =======
  //    X
  // =======
  const parameterX = formulaParser(formulaX);
  if (!parameterX) {
    return { error: `unable to parse this connectedData formula ${formulaX}` };
  }
  const expectedFieldX = parameterX.field || get('DEFAULT_FIELD')[parameterX.omObject];

  const domainSearchX = domainsFilter(domains, domainX, viewDomain, pageDomain, workspaceDomain);
  if (domainSearchX.error) {
    return domainSearchX;
  }
  const domainIdX = domainSearchX.domainId;

  dataId.x = {
    catalog: parameterX.catalog,
    parameterName: parameterX.parameterName,
    comObject: parameterX.comObject,
    domainId: domainIdX,
    domain: domainX,
    field: expectedFieldX,
    sessionName: session.name,
    sessionId: session.id,
  };

  // =======
  //    Y
  // =======
  const parameterY = formulaParser(formulaY);
  if (!parameterY) {
    return { error: `unable to parse this connectedData formula ${formulaY}` };
  }
  const expectedFieldY = parameterY.field || get('DEFAULT_FIELD')[parameterY.comObject];

  const domainSearchY = domainsFilter(domains, domainY, viewDomain, pageDomain, workspaceDomain);
  if (domainSearchY.error) {
    return domainSearchY;
  }
  const domainIdY = domainSearchY.domainId;
  dataId.y = {
    catalog: parameterY.catalog,
    parameterName: parameterY.parameterName,
    comObject: parameterY.comObject,
    domainId: domainIdY,
    domain: domainY,
    field: expectedFieldY,
    sessionName: session.name,
    sessionId: session.id,
  };

  return {
    dataId,
    filters: filter,
    offset,
  };
}

module.exports = parseConnectedDataParametric;
