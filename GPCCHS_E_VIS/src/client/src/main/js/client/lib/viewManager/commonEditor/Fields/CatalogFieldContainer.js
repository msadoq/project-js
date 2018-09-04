import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getCatalogsByDomainIdAndSessionId } from 'store/reducers/catalogs';
import { getDomainId } from 'store/reducers/domains';
import { getSessionIdWithFallback, getSessionNameFromTimeline } from 'store/reducers/sessions';
import { askCatalogs } from 'store/actions/catalogs';
import { get } from 'common/configurationManager';
import CatalogField from './CatalogField';

const wildcardCharacter = get('WILDCARD_CHARACTER');

const mapStateToProps = (state, {
  name,
  domainName,
  timelineId,
  viewId,
  pageId,
  viewSessionName,
}) => {
  const domainId = getDomainId(state, { domainName, viewId, pageId });
  const sessionName = viewSessionName
    || getSessionNameFromTimeline(state, { timelineId, wildcardCharacter });
  const sessionId = getSessionIdWithFallback(state, { sessionName, viewId, pageId });
  const catalogs = getCatalogsByDomainIdAndSessionId(state, { domainId, sessionId });

  return {
    name,
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

