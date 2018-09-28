import _ from 'lodash/fp';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  areCatalogItemComObjectsLoaded,
  areCatalogItemComObjectsLoading,
  areCatalogItemsLoaded,
  getCatalogItemComObjects,
} from 'store/selectors/catalogs';
import { getDomainByNameWithFallback } from 'store/reducers/domains';
import { getSessionByNameWithFallback } from 'store/reducers/sessions';
import { getTimelineById } from 'store/reducers/timelines';
import { askCatalogItemComObjects } from 'store/actions/catalogs';
import { get } from 'common/configurationManager';

import ComObject from './ComObject';

const requested = [];

const mapStateToProps = (state, {
  name,
  domainName,
  timelineId,
  viewId,
  pageId,
  catalogName,
  itemName,
  allowedComObjects,
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
  }
  const selectedSession = getSessionByNameWithFallback(state, { sessionName, viewId, pageId });
  const sessionId = selectedSession ? selectedSession.id : null;

  const catalogItemProps = {
    domainId,
    sessionId,
    catalogName,
    catalogItemName: itemName,
  };

  const comObjects =
    getCatalogItemComObjects(state, catalogItemProps);

  const loading = areCatalogItemComObjectsLoading(state, catalogItemProps);
  const loaded = areCatalogItemComObjectsLoaded(state, catalogItemProps);

  const shouldLoadComObjects =
    typeof domainId === 'number' &&
    typeof sessionId === 'number' &&
    typeof catalogName === 'string' &&
    catalogName.length > 0 &&
    typeof itemName === 'string' &&
    itemName.length > 0 &&
    areCatalogItemsLoaded(state, catalogItemProps) &&
    !loaded &&
    !loading;

  const _filterAllowedComObjects =
    (comObjectsArr) => {
      if (!Array.isArray(comObjectsArr)) {
        return [];
      }

      return comObjectsArr.filter(
        comObject =>
          !allowedComObjects || (allowedComObjects.indexOf(comObject.name) > -1)
      );
    };

  return {
    name,
    comObjects,
    allowedComObjects: _filterAllowedComObjects(comObjects),
    sessionId,
    domainId,
    catalogName,
    itemName,
    shouldLoadComObjects,
    loading,
    loaded,
  };
};

const mapDispatchToProps = dispatch => bindActionCreators({
  askCatalogItemComObjects,
}, dispatch);

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  ...stateProps,
  ...dispatchProps,
  askCatalogItemComObjects: () => {
    const {
      domainId,
      sessionId,
      catalogName,
      itemName,
      shouldLoadComObjects,
    } = stateProps;

    const requestId = [domainId, sessionId, catalogName, itemName];

    if (shouldLoadComObjects) {
      if (_.findIndex(_.isEqual(requestId), requested) === -1) {
        dispatchProps.askCatalogItemComObjects(domainId, sessionId, catalogName, itemName);
        requested.push(requestId);
      }
    }
  },
});

const ComObjectContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(ComObject);

ComObjectContainer.propTypes = {
  name: PropTypes.string,
  domainName: PropTypes.string,
  timelineId: PropTypes.string,
  viewId: PropTypes.string.isRequired,
  pageId: PropTypes.string.isRequired,
  catalogName: PropTypes.string,
  itemName: PropTypes.string,
};

export default ComObjectContainer;

