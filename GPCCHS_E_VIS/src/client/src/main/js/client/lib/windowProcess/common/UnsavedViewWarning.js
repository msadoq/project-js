import React, { PropTypes, PureComponent } from 'react';
import classnames from 'classnames';


export default class UnsavedViewWarning extends PureComponent {
  static propTypes = {
    closeModal: PropTypes.func.isRequired,
    isModified: PropTypes.bool.isRequired,
    openModal: PropTypes.func.isRequired,
    closePage: PropTypes.func.isRequired,
  }

  onIgnore = () => {
    const { closeModal } = this.props;
    closeModal();
    const { isModified, closePage, openModal } = this.props;
    if (isModified) {
      openModal({ type: 'pageIsModified' });
    } else {
      closePage();
    }
  }

  render() {
    const { closeModal } = this.props;
    return (
      <div>
        <h4>There are unsaved views in the page you want to close.</h4>
        <h4>Do you want to continue?</h4>
        <p />
        <div className="text-center">
          <button
            className={classnames('btn', 'btn-primary')}
            onClick={this.onIgnore}
          >
            Yes
          </button>
          {' '}
          <button
            className={classnames('btn', 'btn-primary')}
            onClick={closeModal}
          >
            No
          </button>
        </div>
      </div>
    );
  }
}
