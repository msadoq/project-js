import React, { Component, PropTypes } from 'react';
import _get from 'lodash/get';
import { Glyphicon, DropdownButton, MenuItem } from 'react-bootstrap';
import styles from './Header.css';

export default class Header extends Component {
  static propTypes = {
    isViewsEditorOpen: PropTypes.bool.isRequired,
    configuration: PropTypes.object,
    viewId: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    openEditor: PropTypes.func,
    closeEditor: PropTypes.func,
    unmountAndRemove: PropTypes.func,
  };
  onDropDownClick = (key) => {
    const {
      viewId,
      type,
      configuration,
      isViewsEditorOpen,
      openEditor,
      closeEditor,
      unmountAndRemove,
    } = this.props;
    switch (key) {
      case 'editor': {
        if (isViewsEditorOpen === true && closeEditor) {
          closeEditor();
        } else if (isViewsEditorOpen === false && openEditor) {
          openEditor(viewId, type, configuration);
        }
        break;
      }
      case 'close': {
        unmountAndRemove(viewId);
        break;
      }
      default:
        return;
    }
  }
  render() {
    const { isViewsEditorOpen } = this.props;
    const title = _get(this.props, ['configuration', 'title'], 'No title');
    return (
      <div className={styles.container}>
        <div className={`${styles.title} moveHandler`}>
          {title}
        </div>
        <div className={styles.menu}>
          <DropdownButton
            pullRight
            bsStyle="link"
            title="menu"
            bsSize="xsmall"
            onSelect={this.onDropDownClick}
          >
            <MenuItem eventKey="editor" active>{isViewsEditorOpen ? 'Close' : 'Open'} editor</MenuItem>
            <MenuItem divider />
            <MenuItem eventKey="close">Close view</MenuItem>
          </DropdownButton>
        </div>
      </div>
    );
  }
}
