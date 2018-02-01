// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 24/04/2017 : Edit window title available through upper menu Window -> Rename.
// VERSION : 1.1.2 : DM : #5828 : 05/05/2017 : Add possibility to modify domainName and sessionName from GUI for view, page, window and workspace
// VERSION : 1.1.2 : DM : #5828 : 09/05/2017 : remove domain and session on window apply domain and session of view, page or workspace in case of wildcard
// VERSION : 1.1.2 : DM : #5828 : 10/05/2017 : Add possibility to modify domainName and sessionName from GUI for view, page, window and workspace
// VERSION : 1.1.2 : DM : #5828 : 10/05/2017 : remove domain and session on window apply domain and session of view, page or workspace in case of wildcard
// END-HISTORY
// ====================================================================

import React, { PureComponent, PropTypes } from 'react';
import EditWindow from './EditWindow';

export default class EditWindowWrapper extends PureComponent {
  static propTypes = {
    window: PropTypes.shape().isRequired,
    windows: PropTypes.shape().isRequired,
    updateTitle: PropTypes.func.isRequired,
    closeModal: PropTypes.func.isRequired,
  }

  willEditPage = (values) => {
    const {
      window,
      updateTitle,
      closeModal,
    } = this.props;
    updateTitle(window.uuid, values.title);
    closeModal();
  }

  render() {
    const {
      window,
      windows,
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
        }}
      />
    );
  }
}
