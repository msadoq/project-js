/* eslint-disable no-unused-vars */

import _ from 'lodash/fp';
import { connect } from 'react-redux';
import moment from 'moment/moment';
import { reset } from '../../../../../../store/actions/pus';

import PUSResetModal from './PUSResetModal';
import { getConfigurationByViewId } from '../../../../../selectors';
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

  return {
    domainId,
    sessionId,
  };
};

const mapDispatchToProps = (dispatch, { viewId }) => ({
  sendPUSResetRequest: (domainId, sessionId, initializationMode, initializationDate) => {
    const formattedInitializationDate = moment(initializationDate).format('YYYY-MM-DD');
    dispatch(reset(domainId, sessionId, initializationMode, formattedInitializationDate));
  },
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  ...stateProps,
  ...dispatchProps,
  sendPUSResetRequest: (...args) => {
    const { domainId, sessionId } = stateProps;
    logger.info(`sendPUSResetRequest(${domainId}, ${sessionId}, ${args.join(', ')})`);
    dispatchProps.sendPUSResetRequest(domainId, sessionId, ...args);
  },
});

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(PUSResetModal);
