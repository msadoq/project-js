import React, { PureComponent, PropTypes } from 'react';
import EditWorkspace from './EditWorkspace';

export default class EditWorkspaceWrapper extends PureComponent {
  static propTypes = {
    updateDomainName: PropTypes.func.isRequired,
    updateSessionName: PropTypes.func.isRequired,
    closeModal: PropTypes.func.isRequired,
    domains: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    sessions: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    domainName: PropTypes.string,
    sessionName: PropTypes.string,
  }

  static defaultProps = {
    domainName: null,
    sessionName: null,
  }

  willEditWorkspace = (values) => {
    const {
      updateDomainName,
      updateSessionName,
      closeModal,
      domainName,
      sessionName,
    } = this.props;
    if (values.domainName !== domainName) {
      updateDomainName(values.domainName);
    }
    if (values.sessionName !== sessionName) {
      updateSessionName(values.sessionName);
    }
    closeModal();
  }

  render() {
    const {
      domains,
      sessions,
      domainName,
      sessionName,
    } = this.props;

    return (
      <EditWorkspace
        form={'edit-workspace'}
        onSubmit={this.willEditWorkspace}
        // eslint-disable-next-line react-perf/jsx-no-new-object-as-prop, "DV6 TBC_CNES ReduxForm"
        initialValues={{
          domainName: domainName || '',
          sessionName: sessionName || '',
        }}
        domains={domains}
        sessions={sessions}
      />
    );
  }
}
