import _ from 'lodash';

import {
  getTupleId,
} from 'store/reducers/catalogs';
import { getDomainByNameWithFallback } from 'store/reducers/domains';
import { getSessionByNameWithFallback } from 'store/reducers/sessions';
import { getTimelineById } from 'store/reducers/timelines';
import { get } from 'common/configurationManager';

import parseFormula from './formula';

const wildcardCharacter = get('WILDCARD_CHARACTER');


export default function getUnitParams(state, props) {
  const {
    viewId,
    pageId,
    connectedData,
  } = props;

  const {
    domain,
    timeline,
    formula,
  } = connectedData;

  // do not return unit params if formula is not defined
  if (!formula) {
    return {};
  }

  const {
    catalog,
    parameterName: catalogItem,
  } = parseFormula(formula);

  const domainSelected = getDomainByNameWithFallback(state, { domainName: domain, viewId, pageId });
  const domainId = domainSelected ? domainSelected.domainId : null;
  const timelineSelected = getTimelineById(state, { timelineId: timeline });
  let sessionName = null;
  if (timelineSelected && timelineSelected.sessionName) {
    sessionName = timelineSelected.sessionName;
  } else if (timeline === wildcardCharacter) {
    sessionName = wildcardCharacter;
  }
  const selectedSession = getSessionByNameWithFallback(state, { sessionName, viewId, pageId });
  const sessionId = selectedSession ? selectedSession.id : null;

  const tupleId = getTupleId(domainId, sessionId);

  const unit = _.get(state.catalogs, ['units', tupleId, catalog, catalogItem], 'Unknown');

  return {
    domainId,
    sessionId,
    catalog,
    catalogItem,
    unit,
  };
}
