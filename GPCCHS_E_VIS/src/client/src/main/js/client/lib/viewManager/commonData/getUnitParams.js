import _ from 'lodash/fp';

import { getDomainByNameWithFallback } from 'store/reducers/domains';
import { getSessionByNameWithFallback } from 'store/reducers/sessions';
import { getTimelineById } from 'store/reducers/timelines';
import { get } from 'common/configurationManager';

import parseFormula from './formula';
import { getCatalogItemMetadata } from '../../store/selectors/catalogs';

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

  if (!formula) {
    return {
      domainId,
      sessionId,
      unit: 'Unknown',
    };
  }

  const {
    catalog,
    parameterName: catalogItem,
  } = parseFormula(formula);

  const metadata = getCatalogItemMetadata(
    state,
    {
      domainId,
      sessionId,
      catalogName: catalog,
      catalogItemName: catalogItem,
    }
  );

  const unit = _.getOr('Unkown', 'unit', metadata);

  return {
    domainId,
    sessionId,
    catalog,
    catalogItem,
    unit,
  };
}
