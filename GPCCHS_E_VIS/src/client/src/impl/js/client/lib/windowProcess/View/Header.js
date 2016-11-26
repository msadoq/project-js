import React, { Component, PropTypes } from 'react';
import { DropdownButton, MenuItem } from 'react-bootstrap';
import styles from './Header.css';

export default class Header extends Component {
  static propTypes = {
    isViewsEditorOpen: PropTypes.bool.isRequired,
    configuration: PropTypes.shape({
      title: PropTypes.string, // eslint-disable-line react/no-unused-prop-types
      titleStyle: PropTypes.object
    }),
    viewId: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    openEditor: PropTypes.func,
    closeEditor: PropTypes.func,
    unmountAndRemove: PropTypes.func,
  };
  static defaultProps = {
    configuration: {
      title: 'Untitled',
    }
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
    }
  };

  getTitleStyle() {
    const { configuration: { titleStyle = {} } } = this.props;
    const style = {
      fontFamily: titleStyle.font ? titleStyle.font : null,
      fontSize: titleStyle.size ? titleStyle.size : null,
      textAlign: titleStyle.align ? titleStyle.align : null,
      color: titleStyle.colour ? titleStyle.colour : null,
      fontWeight: 'normal',
      fontStyle: 'normal',
      textDecoration: 'none'
    };

    if (titleStyle.bold) {
      style.fontWeight = 'bold';
    }
    if (titleStyle.italic) {
      style.fontStyle = 'italic';
    }
    if (titleStyle.underline) {
      style.textDecoration = 'underline';
    } else if (titleStyle.strikeOut) {
      style.textDecoration = 'line-through';
    }
    return style;
  }

  render() {
    const { configuration, isViewsEditorOpen } = this.props;
    const { title } = configuration;
    const titleStyle = this.getTitleStyle();

    return (
      <div className={styles.container}>
        <div
          style={titleStyle}
          className={`${styles.title} moveHandler ellipsis`}
        >
          {title}
        </div>
        <div className={styles.menu}>
          <DropdownButton
            pullRight
            bsStyle="link"
            title="menu"
            bsSize="xsmall"
            onSelect={this.onDropDownClick}
            id={`menu${this.props.viewId}`}
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
