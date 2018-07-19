/* eslint-disable no-unused-vars */

import _ from 'lodash/fp';
import { connect } from 'react-redux';
import { saveInFile } from '../../../../../../store/actions/pus';

import PUSSaveInFileModal from './PUSSaveInFileModal';
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

const mapDispatchToProps = dispatch => ({
  sendPUSSaveInFileRequest: (domainId, sessionId, apId) => {
    dispatch(saveInFile(apId));
  },
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  ...stateProps,
  ...dispatchProps,
  sendPUSSaveInFileRequest: (...args) => {
    const { domainId, sessionId } = stateProps;
    logger.info(`sendPUSSaveInFileRequest(${domainId}, ${sessionId}, ${args.join(', ')})`);
    dispatchProps.sendPUSSaveInFileRequest(domainId, sessionId, ...args);
  },
});

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(PUSSaveInFileModal);
