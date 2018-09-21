import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  getCatalogsByDomainIdAndSessionIdArray,
  areCatalogsLoaded,
  areCatalogsLoading,
} from 'store/reducers/catalogs';
import { getDomainId } from 'store/reducers/domains';
import { getSessionIdWithFallback, getSessionNameFromTimeline } from 'store/reducers/sessions';
import { askCatalogs, updateCatalogField } from 'store/actions/catalogs';
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
  const catalogs = getCatalogsByDomainIdAndSessionIdArray(state, { domainId, sessionId });

  const loading = areCatalogsLoading(state, { domainId, sessionId });
  const loaded = areCatalogsLoaded(state, { domainId, sessionId });


  const shouldLoadCatalogs =
    typeof domainId === 'number' &&
    typeof sessionId === 'number' &&
    !loaded &&
    !loading;

  return {
    name,
    catalogs,
    sessionId,
    domainId,
    shouldLoadCatalogs,
    loading,
    loaded,
  };
};

const mapDispatchToProps = dispatch => bindActionCreators({
  updateCatalogField,
  askCatalogs,
}, dispatch);

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  ...stateProps,
  ...dispatchProps,
  askCatalogs: () => {
    const { domainId, sessionId, shouldLoadCatalogs } = stateProps;

    if (shouldLoadCatalogs) {
      setTimeout(() => {
        dispatchProps.askCatalogs(domainId, sessionId);
      }, 500);
    }
  },
});

const CatalogFieldContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(CatalogField);

export default CatalogFieldContainer;

