import React, { PureComponent, PropTypes } from 'react';
import _get from 'lodash/get';
import _memoize from 'lodash/memoize';
import classnames from 'classnames';
import getLogger from 'common/log';
import globalConstants from 'common/constants';
import HeaderContainer from './HeaderContainer';
import MessagesContainer from './MessagesContainer';
import { getViewComponent } from '../../viewManager';
import ChoosePage from './ChoosePage';
import { main } from '../ipc';
import Modal from '../common/Modal';
import handleContextMenu from '../common/handleContextMenu';

import styles from './View.css';

const logger = getLogger('View');

export default class View extends PureComponent {
  static propTypes = {
    windowId: PropTypes.string.isRequired,
    pageId: PropTypes.string.isRequired,
    viewId: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    titleStyle: PropTypes.shape({
      bgColor: PropTypes.string,
    }).isRequired,
    backgroundColor: PropTypes.string,
    maximized: PropTypes.bool,
    isViewsEditorOpen: PropTypes.bool.isRequired,
    closeEditor: PropTypes.func.isRequired,
    openEditor: PropTypes.func.isRequired,
    collapseView: PropTypes.func.isRequired,
    maximizeView: PropTypes.func.isRequired,
    closeView: PropTypes.func.isRequired,
    moveViewToPage: PropTypes.func.isRequired,
  };

  static defaultProps = {
    backgroundColor: '#FFFFFF',
    titleStyle: {
      bgColor: '#FEFEFE',
    },
    absolutePath: '',
    visuWindow: null,
    maximized: false,
  };

  static contextTypes = {
    focusedPageId: PropTypes.string,
  };

  state = {
    choosePage: false,
    pageTitles: [],
  };

  onContextMenu = (mainMenu) => {
    const { isViewsEditorOpen, closeEditor, openEditor } = this.props;
    const editorMenu = (isViewsEditorOpen) ?
    {
      label: 'Close Editor',
      click: () => closeEditor(),
    } : {
      label: 'Open Editor',
      click: () => openEditor(),
    };
    handleContextMenu([editorMenu, { type: 'separator' }, ...mainMenu]);
  }

  getMainContextMenu = ({
    viewId,
    isViewsEditorOpen,
    windowPages,
    collapsed,
    maximized,
    oId,
    absolutePath,
    isModified,
  }) => {
    const { collapseView, maximizeView, closeView, closeEditor } = this.props;
    const isPathDefined = oId || absolutePath;
    return [
      {
        label: 'Move view to another page',
        click: () => {
          const pageTitles = windowPages.reduce((list, page) => (
            [...list, { title: page.title, id: page.pageId }]
          ), []);
          pageTitles.push({ title: 'New page', id: '' });
          this.setState({ pageTitles, choosePage: true });
        },
      },
      {
        label: (collapsed) ? 'Expand view' : 'Collapse view',
        click: () => collapseView(!collapsed),
      },
      {
        label: (maximized) ? 'Minimize view' : 'Maximize view',
        click: () => maximizeView(!maximized),
      },
      {
        label: 'Reload view',
        click: () => main.message(globalConstants.IPC_METHOD_RELOAD_VIEW, { viewId }),
        enabled: (isPathDefined && isModified),
      },
      { type: 'separator' },
      {
        label: 'Save view',
        click: (e) => {
          if (e) e.preventDefault();
          main.message(
            globalConstants.IPC_METHOD_SAVE_VIEW,
            { saveMode: absolutePath, viewId }
          );
        },
        enabled: isPathDefined,
      },
      {
        label: 'Save view as',
        click: () => main.message(globalConstants.IPC_METHOD_SAVE_VIEW, { viewId }),
      },
      {
        label: 'Create a model from view',
        click: () => main.message(globalConstants.IPC_METHOD_CREATE_MODEL, { viewId }),
      },
      { type: 'separator' },
      {
        label: 'Close view',
        click: () => {
          closeView();
          if (isViewsEditorOpen && closeEditor) {
            closeEditor();
          }
        },
      },
    ];
  };

  moveView = (toPage) => {
    const { isViewsEditorOpen, closeEditor } = this.props;
    if (isViewsEditorOpen) {
      closeEditor();
    }
    const { moveViewToPage } = this.props;
    moveViewToPage(toPage);
  }

  borderColorStyle = _memoize(c => ({ borderColor: c }));
  backgroundColorStyle = _memoize(c => ({ backgroundColor: c }));


  render() {
    logger.debug('render');
    const {
      windowId,
      pageId,
      viewId,
      type,
      titleStyle,
      backgroundColor,
      maximized,
      isViewsEditorOpen,
      openEditor,
      closeEditor,
    } = this.props;
    const ContentComponent = getViewComponent(type);
    // console.warn(ContentComponent);
    const mainMenu = this.getMainContextMenu(this.props);
    const borderColor = _get(titleStyle, 'bgColor');
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
    // !! gives visuWindow only for views which uses it to avoid useless rendering
    return (
      <div
        className={classnames('subdiv', styles.container, 'w100', !maximized && 'h100')}
        style={this.borderColorStyle(borderColor)}
        onContextMenu={() => this.onContextMenu(mainMenu)}
      >
        {choosePageDlg}
        <HeaderContainer
          windowId={windowId}
          pageId={pageId}
          viewId={viewId}
          maximized={!!maximized}
        />
        <div
          className={styles.content}
          style={this.backgroundColorStyle(backgroundColor)}
        >
          <MessagesContainer containerId={viewId} />
          <ContentComponent
            viewId={viewId}
            pageId={pageId}
            openInspector={main.openInspector}
            isViewsEditorOpen={isViewsEditorOpen}
            openEditor={openEditor}
            closeEditor={closeEditor}
            mainMenu={mainMenu}
          />
        </div>
      </div>
    );
  }
}
