import { connect } from 'react-redux';

import { updateDomainName, updateSessionName } from '../../store/actions/hsc';
import { getDomains } from '../../store/reducers/domains';
import { getSessions } from '../../store/reducers/sessions';
import { getDomainName, getSessionName } from '../../store/reducers/hsc';

import EditWorkspaceWrapper from './EditWorkspaceWrapper';

const mapStateToProps = state =>
  ({
    domains: getDomains(state),
    sessions: getSessions(state),
    domainName: getDomainName(state),
    sessionName: getSessionName(state),
  });

const mapDispatchToProps = { updateDomainName, updateSessionName };

const EditWorkspaceContainer = connect(mapStateToProps, mapDispatchToProps)(EditWorkspaceWrapper);

export default EditWorkspaceContainer;
