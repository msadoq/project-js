import React, { PureComponent, PropTypes } from 'react';
import _get from 'lodash/get';
import _memoize from 'lodash/memoize';
import classnames from 'classnames';
import getLogger from '../../common/logManager';
import globalConstants from '../../constants';
import HeaderContainer from './HeaderContainer';
import MessagesContainer from './MessagesContainer';
import { getViewComponent } from '../../viewManager/components';
import { main } from '../ipc';
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
    save: PropTypes.func.isRequired,
    saveAs: PropTypes.func.isRequired,
  };

  static defaultProps = {
    backgroundColor: '#FFFFFF',
    titleStyle: {
      bgColor: '#FEFEFE',
    },
    visuWindow: null,
    maximized: false,
  };

  static contextTypes = {
    focusedPageId: PropTypes.string,
  };

  onContextMenu = (mainMenu) => {
    const { isViewsEditorOpen, closeEditor, openEditor } = this.props;
    const editorMenu = (isViewsEditorOpen) ?
    {
      label: 'Close Editor',
      click: () => closeEditor(),
    } : {
      label: 'Open Editor',
      click: () => {
        openEditor();
      },
    };
    handleContextMenu([editorMenu, { type: 'separator' }, ...mainMenu]);
  }

  getMainContextMenu = ({
    viewId,
    isViewsEditorOpen,
    openModal,
    collapsed,
    maximized,
    oId,
    absolutePath,
    isModified,
  }) => {
    const { collapseView, maximizeView, closeView, closeEditor, pageId, windowId } = this.props;
    const isPathDefined = oId || absolutePath;
    const useSaveAs = (!absolutePath && !oId);
    return [
      {
        label: 'Move view to...',
        click: () => openModal({ type: 'moveViewToPage' }),
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
        click: () => this.props.save(),
        enabled: (isPathDefined && isModified),
      },
      {
        label: 'Save view as...',
        click: () => this.props.saveAs(),
      },
      {
        label: 'Save view as a model...',
        click: () => main.message(globalConstants.IPC_METHOD_CREATE_MODEL, { viewId }),
      },
      { type: 'separator' },
      {
        label: 'Close view',
        click: () => {
          if (isModified) {
            openModal({
              type: 'viewIsModified',
              isViewsEditorOpen,
              viewId,
              pageId,
              windowId,
              saveAs: useSaveAs,
            });
          } else {
            closeView();
            if (isViewsEditorOpen && closeEditor) {
              closeEditor();
            }
          }
        },
      },
    ];
  };

  borderColorStyle = _memoize(c => ({ borderColor: c }));
  backgroundColorStyle = _memoize(c => ({ backgroundColor: c }));


  render() {
    logger.debug('render');
    const {
      pageId,
      viewId,
      type,
      titleStyle,
      backgroundColor,
      maximized,
      isViewsEditorOpen,
      openEditor,
      closeEditor,
      collapseView,
    } = this.props;
    const ContentComponent = getViewComponent(type);
    const mainMenu = this.getMainContextMenu(this.props);
    const borderColor = _get(titleStyle, 'bgColor');
    // !! gives visuWindow only for views which uses it to avoid useless rendering
    return (
      <div
        className={classnames('subdiv', styles.container, 'w100', !maximized && 'h100')}
        style={this.borderColorStyle(borderColor)}
        onContextMenu={() => this.onContextMenu(mainMenu)}
      >
        <HeaderContainer
          viewId={viewId}
          pageId={pageId}
          collapseView={collapseView}
          onContextMenu={() => this.onContextMenu(mainMenu)}
        />
        <div
          className={styles.content}
          style={this.backgroundColorStyle(backgroundColor)}
        >
          <MessagesContainer containerId={viewId} />
          <ContentComponent
            viewId={viewId}
            pageId={pageId}
            openInspector={args => main.openInspector(pageId, viewId, type, args)}
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
