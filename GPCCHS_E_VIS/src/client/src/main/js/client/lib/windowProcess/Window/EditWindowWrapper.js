import React, { PureComponent, PropTypes } from 'react';
import EditWindow from './EditWindow';

export default class EditWindowWrapper extends PureComponent {
  static propTypes = {
    window: PropTypes.shape().isRequired,
    windows: PropTypes.shape().isRequired,
    updateTitle: PropTypes.func.isRequired,
    updateDomainName: PropTypes.func.isRequired,
    updateSessionName: PropTypes.func.isRequired,
    domains: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    sessions: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    closeModal: PropTypes.func.isRequired,
  }

  willEditPage = (values) => {
    const {
      window,
      updateTitle,
      updateDomainName,
      updateSessionName,
      closeModal,
    } = this.props;
    updateTitle(window.uuid, values.title);
    updateDomainName(window.uuid, values.domainName);
    updateSessionName(window.uuid, values.sessionName);
    closeModal();
  }

  render() {
    const {
      window,
      windows,
      sessions,
      domains,
    } = this.props;
    return (
      <EditWindow
        form={`edit-window-title-${window.uuid}`}
        onSubmit={this.willEditPage}
        uuid={window.uuid}
        windows={windows}
        // eslint-disable-next-line react-perf/jsx-no-new-object-as-prop, "DV6 TBC_CNES ReduxForm"
        initialValues={{
          title: window.title,
          domainName: window.domainName,
          sessionName: window.sessionName,
        }}
        domains={domains}
        sessions={sessions}
      />
    );
  }
}
