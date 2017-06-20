import React, { PropTypes, PureComponent } from 'react';
import classnames from 'classnames';

export default class SaveBeforeClosing extends PureComponent {
  static propTypes = {
    docType: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    closeEditor: PropTypes.func,
    isViewsEditorOpen: PropTypes.bool,
    closeModal: PropTypes.func.isRequired,
  }

  static defaultProps = {
    isViewsEditorOpen: false,
  }

  close = () => {
    const { onClose, isViewsEditorOpen, closeEditor, closeModal } = this.props;
    onClose();
    if (isViewsEditorOpen && closeEditor) {
      closeEditor();
    }
    closeModal();
  }

  save = () => {
    const { onSave } = this.props;
    onSave();
  }

  render() {
    const { docType, title } = this.props;
    let t = '';
    if (title !== '') {
      t = '"'.concat(title).concat('"');
    }
    return (
      <div>
        <h4>Save changes to {docType} {t} before closing?</h4>
        <p />
        <div className="text-center">
          <button
            className={classnames('btn', 'btn-primary')}
            onClick={this.save}
          >
            Save
          </button>
          {' '}
          <button
            className={classnames('btn', 'btn-primary')}
            onClick={this.close}
          >
            Close without saving
          </button>
        </div>
      </div>
    );
  }
}
