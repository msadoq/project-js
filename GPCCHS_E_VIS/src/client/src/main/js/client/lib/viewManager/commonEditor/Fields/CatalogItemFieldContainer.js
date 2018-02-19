import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getCatalogItems, getTupleId } from 'store/reducers/catalogs';
import { getDomainByNameWithFallback } from 'store/reducers/domains';
import { getSessionByNameWithFallback } from 'store/reducers/sessions';
import { getTimelineById } from 'store/reducers/timelines';
import { askCatalogItems } from 'store/actions/catalogs';
import { get } from 'common/configurationManager';
import CatalogItemField from 'viewManager/commonEditor/Fields/CatalogItemField';

const mapStateToProps = (state, { domainName, timelineId, viewId, pageId, catalogName }) => {
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
  const tupleId = getTupleId(domainId, sessionId);
  const catalogItems = getCatalogItems(state.catalogs, { tupleId, name: catalogName });

  return {
    catalogItems,
    sessionId,
    domainId,
    catalogName,
  };
};

const mapDispatchToProps = dispatch => bindActionCreators({
  askCatalogItems,
}, dispatch);

const CatalogItemFieldContainer = connect(mapStateToProps, mapDispatchToProps)(CatalogItemField);
const { string } = PropTypes;
CatalogItemFieldContainer.propTypes = {
  domainName: string,
  timelineId: string,
  viewId: string.isRequired,
  pageId: string.isRequired,
};

CatalogItemFieldContainer.defaultProps = {
  domainName: null,
  timelineId: null,
};

export default CatalogItemFieldContainer;

