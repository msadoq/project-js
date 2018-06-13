// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 22/03/2017 : remove structure last and range
// VERSION : 1.1.2 : DM : #5828 : 29/03/2017 : Replace sessionId by sessionName in timeline
//  definition
// VERSION : 1.1.2 : DM : #5828 : 14/04/2017 : Move filter application in main process
// VERSION : 1.1.2 : DM : #5828 : 09/05/2017 : remove domain and session on window apply domain and
//  session of view, page or workspace in case of wildcard
// VERSION : 1.1.2 : DM : #5828 : 10/05/2017 : remove domain and session on window apply domain and
//  session of view, page or workspace in case of wildcard
// VERSION : 1.1.2 : DM : #5828 : 14/06/2017 : Move common/log and common/parameters in client/
// VERSION : 2.0.0 : DM : #5806 : 06/12/2017 : Change all relative imports .
// VERSION : 2.0.0 : FA : ISIS-FT-1937 : 30/01/2018 : Unit convertion, add python fork and
//  convertion call mechanism
// VERSION : 2.0.0 : FA : ISIS-FT-2159 : 20/03/2018 : editeur champ flowType VIMA JS
// VERSION : 2.0.0.2 : FA : #11628 : 18/04/2018 : fix master timeline sessionID passed to DC when
//  entrypoint's timeline is *
// END-HISTORY
// ====================================================================

import { get } from 'common/configurationManager';
import { domainDeterminationForDisplay } from 'windowProcess/common/domains';
import formulaParser from './formula';
import domainsFilter from './domains';
import sessionsFilter from './sessions';
import timelinesFilter from './timelines';

export default function parseConnectedData(
  domains,
  sessions,
  timelines,
  connectedData,
  masterTimelineSession,
  viewDomain,
  pageDomain,
  workspaceDomain,
  viewSessionName,
  pageSessionName,
  workspaceSessionName,
  provider
) {
  const { formula, domain, timeline, filter, convertTo, convertFrom } = connectedData;
  // formula
  const parameter = formulaParser(formula);
  if (!parameter) {
    return { error: `unable to parse this connectedData formula ${formula}` };
  }
  const { catalog, parameterName, comObject, field } = parameter;
  const expectedField = field || get('DEFAULT_FIELD')[comObject];

  if ((workspaceDomain || '*') && pageDomain && viewDomain && domain) {
    const display = domainDeterminationForDisplay(workspaceDomain || '*', pageDomain, viewDomain, domain);
    if (!display) {
      return { error: `Domains does not match for ${parameterName}` };
    }
  }

  const domainSearch = domainsFilter(domains, domain, viewDomain, pageDomain, workspaceDomain);
  if (domainSearch.error) {
    return domainSearch;
  }
  const domainId = domainSearch.domainId;
  // timeline
  const timelineSearch = timelinesFilter(timelines, timeline);
  if (timelineSearch.error) {
    return timelineSearch;
  }
  const { sessionName, offset } = timelineSearch;
  const session = sessionsFilter(
    sessions,
    sessionName,
    masterTimelineSession,
    viewSessionName,
    pageSessionName,
    workspaceSessionName
  );
  if (session.error) {
    return session;
  }
  const dataId = {
    catalog,
    parameterName,
    comObject,
    domainId,
    domain: domainSearch.domainName,
    sessionName: session.name,
    sessionId: session.id,
    provider,
  };

  return {
    dataId,
    filters: filter,
    field: expectedField,
    offset,
    convert: {
      from: convertFrom,
      to: convertTo,
    },
  };
}

module.exports = parseConnectedData;
