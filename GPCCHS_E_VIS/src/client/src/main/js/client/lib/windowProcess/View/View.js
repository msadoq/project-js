// ====================================================================
// HISTORY
// VERSION : 1.1.0 : : : 28/02/2017 : Initial version
// VERSION : 1.1.2 : DM : #3622 : 08/02/2017 : Avoid useless view rendering .
// VERSION : 1.1.2 : DM : #3622 : 14/02/2017 : Maj design : remove data & html buttons, add new open editor button
// VERSION : 1.1.2 : DM : #3622 : 20/02/2017 : Debug error on plotview when closing timebar
// VERSION : 1.1.2 : DM : #3622 : 20/02/2017 : Fix missing wrong selectors calls
// VERSION : 1.1.2 : DM : #3622 : 21/02/2017 : Merge branch 'dev' into abesson-html-editor
// VERSION : 1.1.2 : DM : #3622 : 24/02/2017 : Refactoring of dataMap generation using reselect
// VERSION : 1.1.2 : DM : #3622 : 27/02/2017 : merge dev into abesson-html-editor and resolve conflicts
// VERSION : 1.1.2 : DM : #3622 : 03/03/2017 : Work on Maximize and collapse views
// VERSION : 1.1.2 : DM : #3622 : 07/03/2017 : first draft on inspector: retrieve data from rtd on right-click
// VERSION : 1.1.2 : DM : #3622 : 08/03/2017 : merge dev in working branch
// VERSION : 1.1.2 : DM : #3622 : 09/03/2017 : Moving DynamicView PlotView and TextView in dataManager.
// VERSION : 1.1.2 : DM : #3622 : 10/03/2017 : store collapsed & maximized bool in page layout
// VERSION : 1.1.2 : DM : #3622 : 13/03/2017 : Cleanup actions . . .
// VERSION : 1.1.2 : DM : #3622 : 14/03/2017 : Move general variables at top level of a view
// VERSION : 1.1.2 : DM : #5828 : 16/03/2017 : Refacto collapsed maximized using selectors
// VERSION : 1.1.2 : DM : #5822 : 20/03/2017 : merge dev in working branch
// VERSION : 1.1.2 : DM : #5828 : 20/03/2017 : Creation of data store for plotView
// VERSION : 1.1.2 : DM : #5822 : 21/03/2017 : merge dev in working branch
// VERSION : 1.1.2 : DM : #5828 : 21/03/2017 : Fix collapsing using ALT + W
// VERSION : 1.1.2 : DM : #5822 : 22/03/2017 : merge dev in working branch
// VERSION : 1.1.2 : DM : #5828 : 23/03/2017 : Cleanup React components tree and props
// VERSION : 1.1.2 : DM : #5828 : 24/03/2017 : Cleanup React components tree and props
// VERSION : 1.1.2 : DM : #5828 : 24/03/2017 : Fix the maximization of a page view
// VERSION : 1.1.2 : DM : #5828 : 27/03/2017 : Fix resizing bug on view maximized
// VERSION : 1.1.2 : DM : #5822 : 27/03/2017 : merge dev in working branch
// VERSION : 1.1.2 : DM : #5828 : 07/04/2017 : add entry points to mimic view
// VERSION : 1.1.2 : DM : #5828 : 11/04/2017 : Add getViewComponent function in viewManager
// VERSION : 1.1.2 : DM : #5828 : 18/04/2017 : add context menu on views
// VERSION : 1.1.2 : DM : #5828 : 03/05/2017 : update MoveViewToPage modal to the generic modal
// VERSION : 1.1.2 : DM : #5828 : 03/05/2017 : Fix editor search on open
// VERSION : 1.1.2 : DM : #5822 : 03/05/2017 : Inspector : display dynamic data
// VERSION : 1.1.2 : DM : #5828 : 04/05/2017 : Fix 'npm run build' .
// VERSION : 1.1.2 : DM : #6129 : 04/05/2017 : merge dev on mimic branch
// VERSION : 1.1.2 : DM : #5828 : 09/05/2017 : fix save view in contextual menu
// VERSION : 1.1.2 : DM : #6129 : 09/05/2017 : Merge branch 'dev' into abesson-mimic
// VERSION : 1.1.2 : DM : #5828 : 10/05/2017 : Clarify renderer/onSaveView controller . .
// VERSION : 1.1.2 : DM : #5828 : 10/05/2017 : fix save view in contextual menu
// VERSION : 1.1.2 : DM : #6129 : 12/05/2017 : Merge dev branch & gauge done
// VERSION : 1.1.2 : DM : #5828 : 13/06/2017 : Move common/constants/ in client/ folder
// VERSION : 1.1.2 : DM : #5828 : 14/06/2017 : Move common/log and common/parameters in client/
// VERSION : 1.1.2 : FA : ISIS-FT-2132 : 15/06/2017 : Ask to save before closing view or page
// VERSION : 1.1.2 : FA : ISIS-FT-2132 : 20/06/2017 : Fix asking to save before closing view or page
// VERSION : 1.1.2 : DM : #6129 : 27/06/2017 : Fix saving view . .
// VERSION : 1.1.2 : FA : ISIS-FT-2132 : 27/06/2017 : Fix view saving . .
// VERSION : 1.1.2 : FA : #7217 : 06/07/2017 : Fixed : vima crash on new view save
// VERSION : 1.1.2 : FA : #7217 : 07/07/2017 : Go back to previous mechanism to save a view + fix crash on minify view save
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 18/07/2017 : Change view contextual menu about reload and save
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 18/07/2017 : On save view middleware .
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 18/07/2017 : Add onSaveViewAsModel documents middleware .
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 18/07/2017 : Add onSaveView documents middleware .
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 18/07/2017 : Add onReloadView documents middleware .
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 21/07/2017 : Clean IPC about openInspector .
// VERSION : 1.1.2 : FA : #7428 : 02/08/2017 : If a view is collapsed, its now unmounted
// VERSION : 1.1.2 : DM : #6700 : 03/08/2017 : Merge branch 'dev' into dbrugne-data
// VERSION : 1.1.2 : FA : ISIS-FT-2138 : 01/09/2017 : Added error message when dropped item's mime type is not supported.
// END-HISTORY
// ====================================================================

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
