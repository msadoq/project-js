import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  areComObjectsLoaded,
  areComObjectsLoading,
  getCatalogItemComObjects,
  getTupleId,
} from 'store/reducers/catalogs';
import { getDomainByNameWithFallback } from 'store/reducers/domains';
import { getSessionByNameWithFallback } from 'store/reducers/sessions';
import { getTimelineById } from 'store/reducers/timelines';
import { askComObjects } from 'store/actions/catalogs';
import { get } from 'common/configurationManager';
import ComObjectField from './ComObjectField';

const mapStateToProps = (state, {
  name,
  domainName,
  timelineId,
  viewId,
  pageId,
  catalogName,
  itemName,
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

  const comObjects =
    getCatalogItemComObjects(state, { tupleId, name: catalogName, itemName });

  const shouldLoadComObjects =
    typeof domainId === 'number' &&
    typeof sessionId === 'number' &&
    !areComObjectsLoaded(state, { tupleId, name: catalogName, itemName }) &&
    !areComObjectsLoading(state, { tupleId, name: catalogName, itemName });

  return ({
    comObjects,
    shouldLoadComObjects,
    name,
  });
};

const mapDispatchToProps = dispatch => bindActionCreators({
  askComObjects,
}, dispatch);

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  ...stateProps,
  ...dispatchProps,
  askComObjects: () => {
    const {
      domainId,
      sessionId,
      catalogName,
      itemName,
    } = stateProps;

    dispatchProps.askComObjects(domainId, sessionId, catalogName, itemName);
  },
});

const ComObjectFieldContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(ComObjectField);

export default ComObjectFieldContainer;
