import { get } from '../../common/configurationManager';
import formulaParser from './formula';
import domainsFilter from './domains';
import sessionsFilter from './sessions';
import timelinesFilter from './timelines';

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
  const { formula, domain, timeline, filter } = connectedData;
  // formula
  const parameter = formulaParser(formula);
  if (!parameter) {
    return { error: `unable to parse this connectedData formula ${formula}` };
  }
  const { catalog, parameterName, comObject, field } = parameter;
  const expectedField = field || get('DEFAULT_FIELD')[comObject];

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
  const dataId = { catalog,
    parameterName,
    comObject,
    domainId,
    domain: domainSearch.domainName,
    sessionName: session.name,
    sessionId: session.id };

  return {
    dataId,
    filters: filter,
    field: expectedField,
    offset,
  };
}

module.exports = parseConnectedData;
