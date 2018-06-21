import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getCatalogItems, getTupleId } from 'store/reducers/catalogs';
import { getDomainByNameWithFallback } from 'store/reducers/domains';
import { getSessionByNameWithFallback } from 'store/reducers/sessions';
import { getTimelineById } from 'store/reducers/timelines';
import { askCatalogItems, askUnit } from 'store/actions/catalogs';
import { get } from 'common/configurationManager';
import CatalogItemField from 'viewManager/commonEditor/Fields/CatalogItemField';

const mapStateToProps = (state, {
  domainName,
  timelineId,
  viewId,
  pageId,
  catalogName,
  viewSessionName,
}) => {
  const wildcardCharacter = get('WILDCARD_CHARACTER');
  const domain = getDomainByNameWithFallback(state, { domainName, viewId, pageId });
  const domainId = domain ? domain.domainId : null;
  const timeline = getTimelineById(state, { timelineId });
  let sessionName = null;
  if (timeline && timeline.sessionName) {
    sessionName = timeline.sessionName;
  } else if (timelineId === wildcardCharacter) {
    sessionName = wildcardCharacter;
  } else if (viewSessionName) {
    sessionName = viewSessionName;
  }
  const selectedSession = getSessionByNameWithFallback(state, { sessionName, viewId, pageId });
  const sessionId = selectedSession ? selectedSession.id : null;
  const tupleId = getTupleId(domainId, sessionId);
  const catalogItems = getCatalogItems(state.catalogs, { tupleId, name: catalogName });
  const catalogsLoaded = !!Object.keys(state.catalogs).length;

  return {
    catalogItems,
    sessionId,
    domainId,
    catalogName,
    catalogsLoaded,
  };
};

const mapDispatchToProps = dispatch => bindActionCreators({
  askCatalogItems,
  askUnit,
}, dispatch);

const CatalogItemFieldContainer = connect(mapStateToProps, mapDispatchToProps)(CatalogItemField);

CatalogItemFieldContainer.propTypes = {
  domainName: PropTypes.string,
  timelineId: PropTypes.string,
  viewId: PropTypes.string.isRequired,
  pageId: PropTypes.string.isRequired,
};

CatalogItemFieldContainer.defaultProps = {
  domainName: null,
  timelineId: null,
};

export default CatalogItemFieldContainer;

