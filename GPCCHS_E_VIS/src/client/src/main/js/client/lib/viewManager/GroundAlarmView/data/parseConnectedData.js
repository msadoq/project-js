import domainsFilter from '../../commonData/domains';
import sessionsFilter from '../../commonData/sessions';
import timelinesFilter from '../../commonData/timelines';

export default function parseConnectedData(
  domains,
  sessions,
  timelines,
  connectedData,
  masterSessionId,
  viewDomain,
  pageDomain,
  workspaceDomain,
  viewSessionName,
  pageSessionName,
  workspaceSessionName
) {
  const { domain, timeline, filter, mode } = connectedData;
  const comObject = 'GroundMonitoringAlarmAckRequest';

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
    masterSessionId,
    viewSessionName,
    pageSessionName,
    workspaceSessionName
  );
  if (session.error) {
    return session;
  }
  const dataId = {
    parameterName: 'alarm',
    catalog: 'alarm',
    comObject,
    domainId,
    domain: domainSearch.domainName,
    sessionName: session.name,
    sessionId: session.id };

  return {
    dataId,
    field: 'nofield',
    filters: filter,
    offset,
    mode,
  };
}

module.exports = parseConnectedData;
