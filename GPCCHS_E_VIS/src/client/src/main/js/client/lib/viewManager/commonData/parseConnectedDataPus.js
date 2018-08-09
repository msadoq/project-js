import domainDeterminationForDisplay from 'windowProcess/common/domains';
import formulaParser from './formula';
import domainsFilter from './domains';
import sessionsFilter from './sessions';
import timelinesFilter from './timelines';

export default function parseConnectedDataPus(
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
  workspaceSessionName
) {
  const {
    formula,
    domain,
    timeline,
  } = connectedData;
  // formula
  const parameter = formulaParser(formula);
  if (!parameter) {
    return { error: `unable to parse this connectedData formula ${formula}` };
  }
  const { catalog, parameterName, comObject } = parameter;

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
  };

  return {
    dataId,
    offset,
  };
}

module.exports = parseConnectedDataPus;
