import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  getCatalogByName,
  getCatalogItemComObjects,
  getTupleId,
} from 'store/reducers/catalogs';
import { getDomainByNameWithFallback } from 'store/reducers/domains';
import { getSessionByNameWithFallback } from 'store/reducers/sessions';
import { getTimelineById } from 'store/reducers/timelines';
import { askComObjects } from 'store/actions/catalogs';
import _get from 'lodash/get';
import { get } from 'common/configurationManager';
import ComObject from './ComObject';

const mapStateToProps = (state, {
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
  const tupleId = getTupleId(domainId, sessionId);
  const catalog = getCatalogByName(state.catalogs, { tupleId, name: catalogName });
  const catalogItemsLoaded = !!Object.keys(_get(catalog, 'items', {})).length;

  const comObjects =
    getCatalogItemComObjects(state.catalogs, { tupleId, name: catalogName, itemName });

  const _filterAllowedComObjects =
    comObjectsArr =>
      (comObjectsArr || []).filter(
        comObject =>
          !allowedComObjects || (allowedComObjects.indexOf(comObject.name) > -1)
      );

  return {
    comObjects: _filterAllowedComObjects(comObjects),
    sessionId,
    domainId,
    catalogName,
    itemName,
    catalogItemsLoaded,
  };
};

const mapDispatchToProps = dispatch => bindActionCreators({
  askComObjects,
}, dispatch);

const ComObjectContainer = connect(mapStateToProps, mapDispatchToProps)(ComObject);
const { string } = PropTypes;
ComObjectContainer.propTypes = {
  domainName: string,
  timelineId: string,
  viewId: string.isRequired,
  pageId: string.isRequired,
  catalogName: string,
  itemName: string,
};

export default ComObjectContainer;

