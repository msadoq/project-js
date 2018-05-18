import domainsFilter from 'viewManager/commonData/domains';
import sessionsFilter from 'viewManager/commonData/sessions';
import timelinesFilter from 'viewManager/commonData/timelines';
import { domainDeterminationForDisplay } from '../../../windowProcess/common/domains';

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
  workspaceSessionName
) {
  const { domain, timeline, filter, mode } = connectedData;
  const comObject = 'GroundMonitoringAlarmAckRequest';

  if ((workspaceDomain || '*') && pageDomain && viewDomain && domain) {
    const display = domainDeterminationForDisplay(workspaceDomain || '*', pageDomain, viewDomain, domain);
    if (!display) {
      return { error: 'Domains does not match' };
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
    parameterName: '',
    catalog: '',
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
