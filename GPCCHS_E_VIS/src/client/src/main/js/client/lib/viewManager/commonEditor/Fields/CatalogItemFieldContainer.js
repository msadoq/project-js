import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  getCatalogItemsArray,
  getTupleId,
  areCatalogItemsLoaded,
  areCatalogItemsLoading,
  getCatalogsByDomainIdAndSessionId,
} from 'store/reducers/catalogs';
import { getDomainByNameWithFallback } from 'store/reducers/domains';
import { getSessionByNameWithFallback } from 'store/reducers/sessions';
import { getTimelineById } from 'store/reducers/timelines';
import { askCatalogItems } from 'store/actions/catalogs';
import { get } from 'common/configurationManager';
import CatalogItemField from 'viewManager/commonEditor/Fields/CatalogItemField';


const mapStateToProps = (state, {
  name,
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
  const catalogItems = getCatalogItemsArray(state, { tupleId, name: catalogName });

  const loaded = areCatalogItemsLoaded(state, { domainId, sessionId, name: catalogName });
  const loading = areCatalogItemsLoading(state, { domainId, sessionId, name: catalogName });

  const shouldLoadCatalogItems =
    typeof domainId === 'number' &&
    typeof sessionId === 'number' &&
    typeof catalogName === 'string' &&
    !loaded &&
    !loading;

  const catalogs =
    Object.keys(
      getCatalogsByDomainIdAndSessionId(state, { domainId, sessionId })
    );

  return {
    name,
    catalogItems,
    sessionId,
    domainId,
    catalogName,
    catalogs,
    shouldLoadCatalogItems,
    loading,
    loaded,
  };
};

const mapDispatchToProps = dispatch => bindActionCreators({
  askCatalogItems,
}, dispatch);

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  ...stateProps,
  ...dispatchProps,
  askCatalogItems: () => {
    const {
      domainId,
      sessionId,
      catalogName,
      catalogs,
      shouldLoadCatalogItems,
    } = stateProps;

    const filteredCatalogs = catalogs.filter(catalog => catalog.length > 0);

    if (shouldLoadCatalogItems) {
      if (filteredCatalogs.indexOf(catalogName) > -1) {
        dispatchProps.askCatalogItems(domainId, sessionId, catalogName);
      }
    }
  },
});

const CatalogItemFieldContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(CatalogItemField);

CatalogItemFieldContainer.propTypes = {
  name: PropTypes.string,
  domainName: PropTypes.string,
  timelineId: PropTypes.string,
  viewId: PropTypes.string.isRequired,
  pageId: PropTypes.string.isRequired,
};

CatalogItemFieldContainer.defaultProps = {
  name: 'connectedData.catalogItem',
  domainName: null,
  timelineId: null,
};

export default CatalogItemFieldContainer;

