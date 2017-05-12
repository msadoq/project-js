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
