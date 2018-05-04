import { connect } from 'react-redux';
import { askApids } from 'store/actions/apids';
import { bindActionCreators } from 'redux';
import { getApidsByDomainIdAndSessionId } from 'store/reducers/apids';
import { getDomainByNameWithFallback } from 'store/reducers/domains';
import { getTimelineById } from 'store/reducers/timelines';
import { getSessionByNameWithFallback } from 'store/reducers/sessions';
import { get } from 'common/configurationManager';
import ApplicationProcessField from 'viewManager/commonEditor/Fields/ApplicationProcessField';
// import _ from 'lodash';

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

  const applicationProcesses = getApidsByDomainIdAndSessionId(state, { domainId, sessionId });
  return {
    domainId,
    sessionId,
    timelineId,
    applicationProcesses,
  };
};

const mapDispatchToProps = dispatch => bindActionCreators({
  askApids,
}, dispatch);

const ApplicationProcessFieldContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ApplicationProcessField);


export default ApplicationProcessFieldContainer;
