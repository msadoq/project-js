import React, { PropTypes, PureComponent } from 'react';
import classnames from 'classnames';
import { main } from '../ipc';

export default class SaveBeforeClosing extends PureComponent {
  static propTypes = {
    docType: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    closeEditor: PropTypes.func,
    isViewsEditorOpen: PropTypes.bool,
    closeModal: PropTypes.func.isRequired,
    viewId: PropTypes.string,
    windowId: PropTypes.string.isRequired,
    saveAs: PropTypes.bool,
    closeView: PropTypes.func.isRequired,
    closePage: PropTypes.func.isRequired,
  }

  static defaultProps = {
    isViewsEditorOpen: false,
    saveAs: true,
    closeEditor: null,
    viewId: null,
  }

  close = () => {
    const { isViewsEditorOpen, docType, closeModal, closeEditor, closeView, closePage }
      = this.props;
    if (docType === 'view') {
      closeView();
      if (isViewsEditorOpen && closeEditor) {
        closeEditor();
      }
      closeModal();
    } else if (docType === 'page') {
      closePage();
      closeModal();
    }
  }

  save = () => {
    const { docType, viewId, windowId, saveAs, isViewsEditorOpen, closeEditor, closeView,
      closeModal, closePage } = this.props;
    if (docType === 'view') {
      main.saveView({ viewId, saveAs }, (err) => {
        if (!err) {
          if (isViewsEditorOpen && closeEditor) {
            closeEditor();
          }
          closeView();
        }
        closeModal();
      });
    } else if (docType === 'page') {
      main.savePage(windowId, false, (err) => {
        if (!err) {
          closePage();
        }
        closeModal();
      });
    }
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
