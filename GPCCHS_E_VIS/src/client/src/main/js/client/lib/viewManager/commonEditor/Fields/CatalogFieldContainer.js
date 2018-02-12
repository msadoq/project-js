import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getCatalogsByDomainIdAndSessionId } from 'store/reducers/catalogs';
import { getDomainByNameWithFallback } from 'store/reducers/domains';
import { getSessionByNameWithFallback } from 'store/reducers/sessions';
import { getTimelineById } from 'store/reducers/timelines';
import { askCatalogs } from 'store/actions/catalogs';
import { get } from 'common/configurationManager';
import CatalogField from './CatalogField';

const mapStateToProps = (state, { domainName, timelineId, viewId, pageId }) => {
  const wildcardCharacter = get('WILDCARD_CHARACTER');
  const domain = getDomainByNameWithFallback(state, { domainName, viewId, pageId });
  const domainId = domain ? domain.domainId : null;
  const timeline = getTimelineById(state, { timelineId });
  let sessionName = null;
  if (timeline && timeline.sessionName) {
    sessionName = timeline.sessionName;
  } else if (timelineId === wildcardCharacter) {
    sessionName = wildcardCharacter;
  }
  const selectedSession = getSessionByNameWithFallback(state, { sessionName, viewId, pageId });
  const sessionId = selectedSession ? selectedSession.id : null;
  const catalogs = getCatalogsByDomainIdAndSessionId(state, { domainId, sessionId });

  return {
    catalogs,
    sessionId,
    domainId,
  };
};

const mapDispatchToProps = dispatch => bindActionCreators({
  askCatalogs,
}, dispatch);

const CatalogFieldContainer = connect(mapStateToProps, mapDispatchToProps)(CatalogField);

export default CatalogFieldContainer;

