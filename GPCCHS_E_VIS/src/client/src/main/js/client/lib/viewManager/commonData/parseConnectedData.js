import { get } from 'common/parameters';
import formulaParser from './formula';
import domainsFilter from './domains';
import timelinesFilter from './timelines';

export default function parseConnectedData(domains, timelines, connectedData, masterSessionId) {
  const { formula, domain, timeline, filter } = connectedData;
  // formula
  const parameter = formulaParser(formula);
  if (!parameter) {
    return { error: `unable to parse this connectedData formula ${formula}` };
  }
  const { catalog, parameterName, comObject, field } = parameter;
  const expectedField = field || get('DEFAULT_FIELD')[comObject];

  const domainSearch = domainsFilter(domains, domain);
  if (domainSearch.error) {
    return domainSearch;
  }
  const domainId = domainSearch.domainId;
  // timeline
  const timelineSearch = timelinesFilter(timelines, masterSessionId, timeline);
  if (timelineSearch.error) {
    return timelineSearch;
  }
  const { sessionId, offset } = timelineSearch;
  const dataId = { catalog, parameterName, comObject, domainId, sessionId };

  return {
    dataId,
    filter, // TODO : filter"s"
    field: expectedField,
    offset,
  };
}

module.exports = parseConnectedData;
