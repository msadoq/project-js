import React, { PureComponent, PropTypes } from 'react';
import classnames from 'classnames';
import { Button, Glyphicon } from 'react-bootstrap';
import globalConstants from '../../constants';

import styles from './Header.css';
import { main } from '../ipc';

export default class Header extends PureComponent {
  static propTypes = {
    isViewsEditorOpen: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    titleStyle: PropTypes.shape({
      font: PropTypes.string,
      size: PropTypes.number,
      bold: PropTypes.bool,
      italic: PropTypes.bool,
      underline: PropTypes.bool,
      strikeOut: PropTypes.bool,
      align: PropTypes.string,
      color: PropTypes.string,
    }),
    viewId: PropTypes.string.isRequired,
    collapsed: PropTypes.bool.isRequired,
    isModified: PropTypes.bool.isRequired,
    collapseView: PropTypes.func.isRequired,
    onContextMenu: PropTypes.func.isRequired,
  };
  static defaultProps = {
    title: 'Untitled',
    titleStyle: {},
  };

  getTitleStyle() {
    const { titleStyle, isViewsEditorOpen } = this.props;
    const style = {
      fontFamily: titleStyle.font ? titleStyle.font : null,
      fontSize: titleStyle.size ? titleStyle.size : null,
      textAlign: titleStyle.align ? titleStyle.align : null,
      color: titleStyle.color ? titleStyle.color : null,
      background: titleStyle.bgColor ? titleStyle.bgColor : null,
      fontWeight: isViewsEditorOpen ? 'bold' : 'normal',
      fontStyle: 'normal',
      textDecoration: 'none',
      paddingRight: '57px',
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

  expand = () => {
    const { collapseView, collapsed } = this.props;
    collapseView(!collapsed);
  }
  save = (e) => {
    if (e) e.preventDefault();
    const { viewId } = this.props;
    main.message(globalConstants.IPC_METHOD_SAVE_VIEW, { viewId });
  }
  render() {
    const {
      isViewsEditorOpen,
      collapsed,
      isModified,
      onContextMenu,
    } = this.props;

    const title = `${this.props.title} ${isModified ? ' *' : ''}`;


    const titleStyle = this.getTitleStyle();

    return (
      <div
        className={classnames(styles.container, {
          [styles.containerActive]: isViewsEditorOpen,
        })}
      >
        <div
          style={titleStyle}
          className={`moveHandler ellipsis ${styles.title}`}
        >
          {title}{isViewsEditorOpen ? ' (in edition)' : ''}
        </div>
        <div className={styles.dropDownButtonContainer} >
          {!collapsed &&
            <button key={1} className={styles.expandButton} onClick={this.expand}>
              <Glyphicon glyph="minus" />
            </button>
          }
          {
            collapsed &&
            <button
              className={styles.expandButton}
              onClick={this.expand}
              title="Expand"
            >
              &#9633;
            </button>
          }
          <Button
            className={styles.expandButton}
            onClick={onContextMenu}
            title="Display Menu"
          >
            <Glyphicon glyph="align-justify" />
          </Button>
          {
            (collapsed && isModified) &&
            <button
              key={2}
              className={classnames(styles.expandButton, styles.saveButton)}
              onClick={this.save}
            >
              SAVE
            </button>
          }
        </div>
      </div>
    );
  }
}
