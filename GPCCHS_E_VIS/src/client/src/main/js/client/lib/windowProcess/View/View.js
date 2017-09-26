import React, { PureComponent, PropTypes } from 'react';
import _get from 'lodash/get';
import _memoize from 'lodash/memoize';
import classnames from 'classnames';
import getLogger from '../../common/logManager';
import HeaderContainer from './HeaderContainer';
import MessagesContainer from '../common/MessagesContainer';
import { getViewComponent } from '../../viewManager/components';
import handleContextMenu from '../common/handleContextMenu';

import styles from './View.css';

const logger = getLogger('View');

export default class View extends PureComponent {
  static propTypes = {
    pageId: PropTypes.string.isRequired,
    viewId: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    titleStyle: PropTypes.shape({
      bgColor: PropTypes.string,
    }).isRequired,
    backgroundColor: PropTypes.string,
    maximized: PropTypes.bool,
    isViewsEditorOpen: PropTypes.bool.isRequired,
    askOpenInspector: PropTypes.func.isRequired,
    closeEditor: PropTypes.func.isRequired,
    openEditor: PropTypes.func.isRequired,
    collapseView: PropTypes.func.isRequired,
    maximizeView: PropTypes.func.isRequired,
    closeView: PropTypes.func.isRequired,
    reloadView: PropTypes.func.isRequired,
    save: PropTypes.func.isRequired,
    saveAs: PropTypes.func.isRequired,
    openModal: PropTypes.func.isRequired,
    saveViewAsModel: PropTypes.func.isRequired,
    collapsed: PropTypes.bool.isRequired,
    absolutePath: PropTypes.string,
  };

  static defaultProps = {
    oId: '',
    absolutePath: '',
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

  getMainContextMenu = () => {
    const {
      collapsed, maximized, absolutePath,
      openModal, collapseView, maximizeView, closeView, reloadView,
    } = this.props;
    const isPathDefined = !!absolutePath;
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
        click: () => reloadView(),
        enabled: (isPathDefined),
      },
      { type: 'separator' },
      {
        label: 'Save view',
        click: () => this.props.save(),
      },
      {
        label: 'Save view as...',
        click: () => this.props.saveAs(),
      },
      {
        label: 'Save view as a model...',
        click: () => this.props.saveViewAsModel(),
      },
      { type: 'separator' },
      {
        label: 'Close view',
        click: () => closeView(),
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
      askOpenInspector,
      collapsed,
      save,
    } = this.props;
    const ContentComponent = getViewComponent(type);
    const mainMenu = this.getMainContextMenu();
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
          saveView={save}
          onContextMenu={() => this.onContextMenu(mainMenu)}
        />
        { !collapsed &&
        <div
          className={styles.content}
          style={this.backgroundColorStyle(backgroundColor)}
        >
          <MessagesContainer containerId={viewId} />
          <ContentComponent
            viewId={viewId}
            pageId={pageId}
            openInspector={args => askOpenInspector(pageId, viewId, type, args)}
            isViewsEditorOpen={isViewsEditorOpen}
            openEditor={openEditor}
            closeEditor={closeEditor}
            mainMenu={mainMenu}
          />
        </div>
        }
      </div>
    );
  }
}
