import React, { PureComponent, PropTypes } from 'react';
import classnames from 'classnames';
import { Button, MenuItem } from 'react-bootstrap';
import globalConstants from 'common/constants';

import styles from './Header.css';
import Modal from '../common/Modal';
import ChoosePage from './ChoosePage';
import Tooltip from '../common/Tooltip';
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
    maximized: PropTypes.bool.isRequired,
    oId: PropTypes.string.isRequired,
    absolutePath: PropTypes.string.isRequired,
    isModified: PropTypes.bool.isRequired,
    windowPages: PropTypes.arrayOf(PropTypes.object).isRequired,
    openEditor: PropTypes.func.isRequired,
    closeEditor: PropTypes.func.isRequired,
    closeView: PropTypes.func.isRequired,
    moveViewToPage: PropTypes.func.isRequired,
    collapseView: PropTypes.func.isRequired,
    maximizeView: PropTypes.func.isRequired,
  };
  static defaultProps = {
    title: 'Untitled',
    titleStyle: {},
  };
  static contextTypes = {
    windowId: PropTypes.string,
  };

  constructor(...args) {
    super(...args);
    this.state = {
      choosePage: false,
      pageTitles: [],
      // errorMessage: null,
    };
  }

  onDropDownClick = (key) => {
    const {
      viewId,
      isViewsEditorOpen,
      openEditor,
      closeEditor,
      closeView,
      windowPages,
      collapseView,
      collapsed,
      maximizeView,
      maximized,
    } = this.props;
    switch (key) {
      case 'editor': {
        if (isViewsEditorOpen) {
          closeEditor();
        } else if (!isViewsEditorOpen) {
          openEditor();
        }
        break;
      }
      case 'move': {
        const pageTitles = windowPages.reduce((list, page) => (
          [...list, { title: page.title, id: page.pageId }]
        ), []);
        pageTitles.push({ title: 'New page', id: '' });
        this.setState({ pageTitles, choosePage: true });
        break;
      }
      case 'close': {
        closeView();
        if (isViewsEditorOpen && closeEditor) {
          closeEditor();
        }
        break;
      }
      case 'collapse': {
        collapseView(!collapsed);
        break;
      }
      case 'maximize': {
        maximizeView(!maximized);
        break;
      }
      case 'save':
        this.save();
        break;
      case 'saveAs':
        main.message(globalConstants.IPC_METHOD_SAVE_VIEW, { viewId });
        break;
      case 'reload':
        main.message(globalConstants.IPC_METHOD_RELOAD_VIEW, { viewId });
        break;
      case 'createModel':
        main.message(globalConstants.IPC_METHOD_CREATE_MODEL, { viewId });
        break;
      default:
    }
  };

  getTooltipContent = () => {
    const {
      isViewsEditorOpen,
      oId,
      absolutePath,
      isModified,
      maximized,
    } = this.props;
    const isPathDefined = oId || absolutePath;
    const ulStyle = { display: 'block', top: '0', left: '0' };
    return (
      <ul className="dropdown-menu open" style={ulStyle} id={`menu${this.props.viewId}`}>
        <MenuItem onSelect={this.onDropDownClick} eventKey="editor" active>{isViewsEditorOpen ? 'Close' : 'Open'} editor</MenuItem>
        <MenuItem onSelect={this.onDropDownClick} eventKey="move">Move to another page</MenuItem>
        <MenuItem onSelect={this.onDropDownClick} eventKey="collapse">Collapse</MenuItem>
        {
          maximized ? <MenuItem onSelect={this.onDropDownClick} eventKey="maximize">Minimize</MenuItem> :
          <MenuItem onSelect={this.onDropDownClick} eventKey="maximize">Maximize</MenuItem>
        }
        {isPathDefined && isModified ? <MenuItem onSelect={this.onDropDownClick} eventKey="reload">Reload view</MenuItem>
                       : <MenuItem onSelect={this.onDropDownClick} eventKey="reload" disabled>Reload view</MenuItem>}
        <MenuItem divider />
        {isPathDefined ? <MenuItem onSelect={this.onDropDownClick} eventKey="save">Save</MenuItem>
                       : <MenuItem onSelect={this.onDropDownClick} eventKey="save" disabled>Save</MenuItem>}
        <MenuItem onSelect={this.onDropDownClick} eventKey="saveAs">Save as</MenuItem>
        <MenuItem onSelect={this.onDropDownClick}eventKey="createModel">Create a model from view</MenuItem>
        <MenuItem divider />
        <MenuItem onSelect={this.onDropDownClick} eventKey="close">Close view</MenuItem>
      </ul>
    );
  }


  getTitleStyle() {
    const { titleStyle } = this.props;
    const style = {
      fontFamily: titleStyle.font ? titleStyle.font : null,
      fontSize: titleStyle.size ? titleStyle.size : null,
      textAlign: titleStyle.align ? titleStyle.align : null,
      color: titleStyle.color ? titleStyle.color : null,
      background: titleStyle.bgColor ? titleStyle.bgColor : null,
      fontWeight: 'normal',
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

  moveView = (toPage) => {
    const { isViewsEditorOpen, closeEditor } = this.props;
    if (isViewsEditorOpen) {
      closeEditor();
    }
    const { moveViewToPage } = this.props;
    moveViewToPage(toPage);
  }

  expand = () => {
    const { collapseView, collapsed } = this.props;
    collapseView(!collapsed);
  }
  save = (e) => {
    if (e) e.preventDefault();
    const {
      viewId,
      absolutePath,
    } = this.props;
    main.message(
      globalConstants.IPC_METHOD_SAVE_VIEW,
      { saveMode: absolutePath, viewId }
    );
  }
  render() {
    const {
      isViewsEditorOpen,
      collapsed,
      isModified,
    } = this.props;

    const title = `${this.props.title} ${isModified ? ' *' : ''}`;


    const titleStyle = this.getTitleStyle();
    const expandButtonStyle = { opacity: '1', backgroundColor: 'rgb(239,239,239)', color: 'rgb(51,51,51)', padding: '3px 6px', marginLeft: '3px', marginRight: '3px', marginTop: '1px', height: '22px', border: '1px solid rgb(180,180,180)' };
    const saveButtonStyle = { opacity: '1', backgroundColor: 'rgb(239,239,239)', color: 'rgb(51,51,51)', padding: '3px 6px', marginLeft: '3px', marginRight: '3px', marginTop: '1px', height: '22px', border: '1px solid rgb(180,180,180)' };
    const choosePageDlg = (
      <Modal
        title="Choose Page to move to"
        isOpened={this.state.choosePage}
        onClose={() => this.setState({ choosePage: false })}
      >
        <ChoosePage
          onClose={this.moveView}
          pageTitles={this.state.pageTitles}
        />
      </Modal>
    );

    return (
      <div
        className={classnames(styles.container, {
          [styles.containerActive]: isViewsEditorOpen,
        })}
      >
        <div
          style={titleStyle}
          className={`${styles.title} moveHandler ellipsis`}
        >
          {title}
        </div>
        {choosePageDlg}

        <div className={styles.dropDownButtonContainer} >
          {!collapsed &&
            [
              <Button
                key="menu_button"
                className={styles.dropDownButton}
                bsStyle="link"
                bsSize="xsmall"
                ref={(c) => { this.menuButton = c; }}
              > MENU
            </Button>,
              <Tooltip
                key="Tooltip"
                getTarget={() => this.menuButton}
                getContent={() => this.getTooltipContent()}
              />,
            ]
          }
          {collapsed &&
            [
              <button key={1} style={expandButtonStyle} className={classnames('btn', 'btn-sm', 'btn-default')} onClick={this.expand}>Expand</button>,
              <button key={2} style={saveButtonStyle} className={classnames('btn', 'btn-sm', 'btn-default')} onClick={this.save}>Save</button>,
            ]
          }
        </div>
      </div>
    );
  }
}
