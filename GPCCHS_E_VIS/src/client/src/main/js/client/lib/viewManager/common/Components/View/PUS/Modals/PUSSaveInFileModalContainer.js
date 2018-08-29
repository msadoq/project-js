/* eslint-disable no-unused-vars */

import _ from 'lodash/fp';
import { connect } from 'react-redux';
import { saveInFile } from 'store/actions/pus';
import { getConfigurationByViewId } from 'viewManager/selectors';
import { getApidsByDomainIdAndSessionId } from 'store/reducers/apids';
import { getDomainId } from 'store/reducers/domains';
import { getSessionId } from 'store/reducers/sessions';
import WithForm from 'viewManager/common/Hoc/WithForm';
import getLogger from 'common/logManager';

import PUSSaveInFileModal from './PUSSaveInFileModal';

const logger = getLogger('viewManager:pus');

const mapStateToProps = (state, { viewId }) => {
  const conf = getConfigurationByViewId(state, { viewId });

  const { connectedData, name } = _.getOr({}, ['entryPoints', 0], conf);

  const { domain, session, apids } = connectedData;

  const domainId = getDomainId(state, { domainName: domain });
  const sessionId = getSessionId(state, { sessionName: session });

  return {
    domainId,
    sessionId,
    apids,
    name,
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

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(WithForm(PUSSaveInFileModal));
