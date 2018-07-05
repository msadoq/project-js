import { connect } from 'react-redux';
import { askApids } from 'store/actions/apids';
import { bindActionCreators } from 'redux';
import _get from 'lodash/get';
import { getApidsByDomainIdAndSessionId } from 'store/reducers/apids';
import { getDomainByNameWithFallback } from 'store/reducers/domains';
import ApplicationProcessField from 'viewManager/commonEditor/Fields/ApplicationProcessField';
import { getSessionByNameWithFallback } from '../../../store/reducers/sessions';
import { getTimelineById } from '../../../store/reducers/timelines';

const mapStateToProps = (state, { domainName, timelineId, viewId, pageId }) => {
  const domain = getDomainByNameWithFallback(state, { domainName, viewId, pageId });
  const domainId = domain ? _get(domain, 'domainId', null) : null;

  const timeline = getTimelineById(state, { timelineId });
  const sessionName = _get(timeline, 'sessionName', null);

  const session = getSessionByNameWithFallback(state, { sessionName });
  const sessionId = session ? _get(session, 'id', null) : null;

  const applicationProcesses = getApidsByDomainIdAndSessionId(state, { domainId, sessionId });
  return {
    domainId,
    sessionId,
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
