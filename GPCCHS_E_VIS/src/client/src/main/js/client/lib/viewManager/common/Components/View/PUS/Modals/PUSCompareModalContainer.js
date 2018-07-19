/* eslint-disable no-unused-vars */

import _ from 'lodash/fp';
import { connect } from 'react-redux';
import moment from 'moment/moment';
import { compare } from '../../../../../../store/actions/pus';

import PUSCompareModal from './PUSCompareModal';
import { getConfigurationByViewId } from '../../../../../selectors';
import { getApidsByDomainIdAndSessionId } from '../../../../../../store/reducers/apids';
import { getDomainId } from '../../../../../../store/reducers/domains';
import { getSessionId } from '../../../../../../store/reducers/sessions';
import getLogger from '../../../../../../common/logManager';

const logger = getLogger('viewManager:pus');

const mapStateToProps = (state, { viewId }) => {
  const conf = getConfigurationByViewId(state, { viewId });

  const { connectedData } = _.getOr({}, ['entryPoints', 0], conf);

  const { domain, session } = connectedData;

  const domainId = getDomainId(state, { domainName: domain });
  const sessionId = getSessionId(state, { sessionName: session });

  const apids = getApidsByDomainIdAndSessionId(state, { domainId, sessionId });

  return {
    domainId,
    sessionId,
    apids,
  };
};

const mapDispatchToProps = (dispatch, { viewId }) => ({
  sendPUSCompareRequest: (domainId, sessionId, apId, date, shouldStartComparisonTool) => {
    const formattedDate = moment(date).format('YYYY-MM-DD');
    dispatch(compare(domainId, sessionId, apId, formattedDate, shouldStartComparisonTool));
  },
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  ...stateProps,
  ...dispatchProps,
  sendPUSCompareRequest: (...args) => {
    const { domainId, sessionId } = stateProps;
    logger.info(`sendPUSCompareRequest(${domainId}, ${sessionId}, ${args.join(', ')})`);
    dispatchProps.sendPUSCompareRequest(domainId, sessionId, ...args);
  },
});

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(PUSCompareModal);
