import _ from 'lodash/fp';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  getCatalogItems,
  areCatalogsLoaded,
  areCatalogItemsLoaded,
  areCatalogItemsLoading,
  getCatalogs,
} from 'store/selectors/catalogs';

import { getDomainByNameWithFallback } from 'store/reducers/domains';
import { getSessionByNameWithFallback } from 'store/reducers/sessions';
import { getTimelineById } from 'store/reducers/timelines';
import { askCatalogItems } from 'store/actions/catalogs';
import { get } from 'common/configurationManager';
import CatalogItemField from 'viewManager/commonEditor/Fields/CatalogItemField';


const requested = [];

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
  const catalogItems = getCatalogItems(state, { domainId, sessionId, catalogName });

  const loaded = areCatalogItemsLoaded(state, { domainId, sessionId, catalogName });
  const loading = areCatalogItemsLoading(state, { domainId, sessionId, catalogName });

  const shouldLoadCatalogItems =
    typeof domainId === 'number' &&
    typeof sessionId === 'number' &&
    typeof catalogName === 'string' &&
    areCatalogsLoaded(state, { domainId, sessionId }) &&
    !loaded &&
    !loading;

  const catalogs = getCatalogs(state, { domainId, sessionId });

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

    const requestId = [domainId, sessionId, catalogName];

    if (shouldLoadCatalogItems) {
      const found = _.findIndex(catalog => catalog.name === catalogName, catalogs);

      if (found > -1) {
        if (_.findIndex(_.isEqual(requestId), requested) === -1) {
          dispatchProps.askCatalogItems(domainId, sessionId, catalogName);
          requested.push(requestId);
        }
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

