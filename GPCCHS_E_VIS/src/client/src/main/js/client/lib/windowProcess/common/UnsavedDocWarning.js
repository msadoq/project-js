import React, { PropTypes, PureComponent } from 'react';
import classnames from 'classnames';


export default class UnsavedDocWarning extends PureComponent {
  static propTypes = {
    subDocType: PropTypes.string.isRequired,
    docType: PropTypes.string.isRequired,
    onIgnore: PropTypes.func.isRequired,
    closeModal: PropTypes.func.isRequired,
  }

  render() {
    const { subDocType, docType, onIgnore, closeModal } = this.props;
    return (
      <div>
        <h4>There are unsaved {subDocType} in the {docType} you want to close.</h4>
        <h4>Do you want to continue?</h4>
        <p />
        <div className="text-center">
          <button
            className={classnames('btn', 'btn-primary')}
            onClick={onIgnore}
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
