// ====================================================================
// HISTORY
// VERSION : 1.1.0 : : : 28/02/2017 : Initial version
// VERSION : 1.1.2 : DM : #3622 : 14/02/2017 : Explorer Right panel refactoring .
// VERSION : 1.1.2 : DM : #3622 : 14/03/2017 : Ignore not loaded views in dataMap and data
//  requesting
// VERSION : 1.1.2 : DM : #5828 : 15/03/2017 : Remove displayHelp state and replace with store
// VERSION : 1.1.2 : DM : #5828 : 15/03/2017 : Control help, explorer and timebar from electron
//  menu
// VERSION : 1.1.2 : DM : #5828 : 15/03/2017 : Remove the explorer resizable behavior and use
//  panels data to handle show/hide
// VERSION : 1.1.2 : DM : #5828 : 16/03/2017 : Fix linting rules on hsc hss and common
// VERSION : 1.1.2 : DM : #5828 : 16/03/2017 : Add partial performance widget in explorer
// VERSION : 1.1.2 : DM : #5828 : 16/03/2017 : Add dataMap and store explorer widgets
// VERSION : 1.1.2 : DM : #5828 : 23/03/2017 : Draft the resizable panels and cleanup components
//  props (views not functionnal)
// VERSION : 1.1.2 : DM : #5828 : 23/03/2017 : Cleanup React components tree and props
// VERSION : 1.1.2 : DM : #5828 : 24/03/2017 : Cleanup React components tree and props
// VERSION : 1.1.2 : DM : #5828 : 24/03/2017 : Fix few broken unit tests
// VERSION : 1.1.2 : DM : #5828 : 24/03/2017 : Draft the resizable panels and cleanup components
//  props (views not functionnal)
// VERSION : 1.1.2 : DM : #5828 : 24/03/2017 : Fix new window panels layout page views
//  scrollability
// VERSION : 1.1.2 : DM : #5828 : 28/03/2017 : Timebar is collapsable. action reducer test.
// VERSION : 1.1.2 : DM : #5828 : 30/03/2017 : Add a F1 button in VIMA to open the docu wiki helper
// VERSION : 1.1.2 : DM : #5828 : 04/04/2017 : Window.js : new divs above panel dividers,
//  auto-moving when panels move.
// VERSION : 1.1.2 : DM : #5828 : 05/04/2017 : minimize and keep old size for explorer and editor
// VERSION : 1.1.2 : DM : #5828 : 07/04/2017 : Collapse / minimize buttons on panel dividers. New
//  colors for dividers, darker.
// VERSION : 1.1.2 : DM : #5828 : 10/04/2017 : Window.js : rethinking panels behaviour, fix vima
//  bottom invisible.
// VERSION : 1.1.2 : DM : #5828 : 11/04/2017 : Handle panel collapse/expand buttons with css
//  instead of JE and react refs.
// VERSION : 1.1.2 : DM : #5828 : 12/04/2017 : New GenericModal component displayed or not
//  displayed at root (Window.js) AddTimeline and EditTimeline forms displayed through it.
// VERSION : 1.1.2 : DM : #5828 : 12/04/2017 : Collapse/minimize Editor/Explorer : buttons are in
//  Window.js
// VERSION : 1.1.2 : DM : #5828 : 14/04/2017 : Fix messages display, top right corner.
// VERSION : 1.1.2 : DM : #5828 : 18/04/2017 : Panels are now sticky on left and right.
// VERSION : 1.1.2 : DM : #5828 : 21/04/2017 : Cleaned adn moved shortcuts handling to
//  windowWrapper.
// VERSION : 1.1.2 : DM : #5828 : 27/04/2017 : React panel bars are lighter, added the NO PAGE
//  sentence and not displaying panels when no page.
// VERSION : 1.1.2 : DM : #5828 : 28/04/2017 : New D P I buttons in explorer vertical bar.
// VERSION : 1.1.2 : DM : #5828 : 28/04/2017 : No vertical bar when editor minimized.
// VERSION : 1.1.2 : DM : #5828 : 28/04/2017 : When clicking on explorer shortcuts, explorer
//  auto-expands if it is not expanded.
// VERSION : 1.1.2 : DM : #5828 : 03/05/2017 : Handle the case where there is no pageId in window,
//  not rendering panels.
// VERSION : 1.1.2 : DM : #5828 : 14/06/2017 : Move common/log and common/parameters in client/
// VERSION : 1.1.2 : DM : #6688 : 05/07/2017 : First draft on catalog explorer
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 06/07/2017 : Can now propagate choice and modal props via
//  closeModal action
// VERSION : 1.1.2 : FA : #7145 : 04/08/2017 : Clean IPC about opening wiki helper + create a store
//  folder in mainProcess
// VERSION : 1.1.2 : FA : #7114 : 22/08/2017 : catch auxclick event and stop propagation
// VERSION : 2.0.0 : DM : #6127 : 22/09/2017 : Move common/Dimensions.js in
//  common/hoc/withDimensions .
// VERSION : 2.0.0 : FA : #8192 : 20/10/2017 : Possibility to drop a page on an empty workspace.
// VERSION : 2.0.0 : DM : #6832 : 08/11/2017 : Fix AckModal closing using a new action
//  WS_MODAL_CLOSED
// VERSION : 2.0.0 : DM : #5806 : 14/11/2017 : Merge branch 'alarm_5806' into dev
// VERSION : 2.0.0 : DM : #5806 : 06/12/2017 : Change all relative imports .
// VERSION : 2.0.0.1 : FA : #11627 : 13/04/2018 : deal with multidomain sat colors
// END-HISTORY
// ====================================================================

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Glyphicon } from 'react-bootstrap';
import PanelGroup from 'react-panelgroup';
import classnames from 'classnames';
import _ from 'lodash/fp';
import _memoize from 'lodash/memoize';
import _debounce from 'lodash/debounce';
import _get from 'lodash/get';
import getLogger from 'common/logManager';
import withDimensions from '../common/hoc/withDimensions';
import MessagesContainer from '../Navigation/MessagesContainer';
import TimebarMasterContainer from '../Timebar/TimebarMasterContainer';
import TabsContainer from '../Navigation/TabsContainer';
import EditorContainer from '../Editor/EditorContainer';
import SearchContainer from '../Search/SearchContainer';
// import Page from '../Page/Page';
import ContentContainer from '../Page/ContentContainer';
import styles from './Window.css';
import TimebarCollapsedContainer from '../Timebar/TimebarCollapsedContainer';
import ExplorerContainer from '../Explorer/ExplorerContainer';
import ModalGeneric from '../common/ModalGeneric';
import NoPageContainer from './NoPageContainer';

import HelpContentContainer from '../Navigation/HelpContentContainer';
import handleContextMenu from '../common/handleContextMenu';

const logger = getLogger('Window');

const resizeHandleSize = 3;
const scrollHandleSize = 15;
const defaultExplorerWidth = 250;
const defaultEditorWidth = 400;
const defaultSearchWidth = 350;
const minimizedTimebarHeigh = 35;
const panelBorderColor = '#444';
const tabsContainerStyle = { height: 50 };

const explorerWidgets = [
  ['D', 'Datastore Explorer', 'dsex'],
  ['C', 'Catalog Explorer', 'rte'],
  ['I', 'Inspector', 'inspector'],
];

class Window extends PureComponent {
  static propTypes = {
    windowId: PropTypes.string.isRequired,
    pageId: PropTypes.string,
    isHelpDisplayed: PropTypes.bool,
    setIsLoaded: PropTypes.func.isRequired,
    // sizes
    containerWidth: PropTypes.number,
    containerHeight: PropTypes.number,
    editorWidth: PropTypes.number,
    editorIsMinimized: PropTypes.bool,
    searchWidth: PropTypes.number,
    searchIsMinimized: PropTypes.bool,
    timebarHeight: PropTypes.number,
    timebarIsMinimized: PropTypes.bool,
    explorerIsMinimized: PropTypes.bool,
    explorerWidth: PropTypes.number,
    resizeEditor: PropTypes.func.isRequired,
    resizeSearch: PropTypes.func.isRequired,
    resizeTimebar: PropTypes.func.isRequired,
    resizeExplorer: PropTypes.func.isRequired,
    minimizeExplorer: PropTypes.func.isRequired,
    minimizeEditor: PropTypes.func.isRequired,
    minimizeSearch: PropTypes.func.isRequired,
    minimizeTimebar: PropTypes.func.isRequired,
    focusTabInExplorer: PropTypes.func.isRequired,
    modal: PropTypes.objectOf(PropTypes.shape),
    closeModal: PropTypes.func.isRequired,
    modalClosed: PropTypes.func.isRequired,
    addBlankPage: PropTypes.func.isRequired,
    askOpenPage: PropTypes.func.isRequired,
    openModal: PropTypes.func.isRequired,
    askSavePage: PropTypes.func.isRequired,
    pause: PropTypes.func.isRequired,
    loadInSearch: PropTypes.func.isRequired,
    pageViewsIdsForSearch: PropTypes.arrayOf(PropTypes.string),
  };

  static defaultProps = {
    isHelpDisplayed: false,
    // sizes
    containerWidth: 500,
    containerHeight: 500,
    editorWidth: defaultEditorWidth,
    editorIsMinimized: true,
    searchWidth: defaultSearchWidth,
    searchIsMinimized: true,
    timebarHeight: 250,
    timebarIsMinimized: false,
    explorerWidth: defaultExplorerWidth,
    explorerIsMinimized: true,
    modal: null,
    pageId: null,
    pageViewsIdsForSearch: [],
  }

  static childContextTypes = {
    windowId: PropTypes.string,
  };

  getChildContext() {
    return {
      windowId: this.props.windowId,
    };
  }

  componentDidMount() {
    // set in store that this is window is fully loaded and ready to run
    const { setIsLoaded, windowId } = this.props;
    window.addEventListener('auxclick', this.handleAuxClick, false);
    setTimeout(() => setIsLoaded(windowId), 0);
  }

  onHorizontalUpdate = _debounce((panelWidth) => {
    const {
      pageId,
      editorWidth,
      resizeEditor,
      searchWidth,
      resizeSearch,
      explorerWidth,
      resizeExplorer,
      minimizeExplorer,
      minimizeEditor,
      minimizeSearch,
    } = this.props;

    const newEditorWidth = _get(panelWidth, [0, 'size']);
    if (editorWidth !== newEditorWidth) {
      if (newEditorWidth < 50) {
        minimizeEditor(pageId, true);
      } else if (newEditorWidth > 0) {
        resizeEditor(pageId, newEditorWidth);
      }
    }

    const newSearchWidth = _get(panelWidth, [1, 'size']);
    if (searchWidth !== newSearchWidth) {
      if (newSearchWidth < 50) {
        minimizeSearch(pageId, true);
      } else if (newSearchWidth > 0) {
        resizeSearch(pageId, newSearchWidth);
      }
    }

    const newExplorerWidth = _get(panelWidth, [3, 'size']);
    if (explorerWidth !== newExplorerWidth) {
      if (newExplorerWidth < 50) {
        minimizeExplorer(pageId, true);
      } else if (newExplorerWidth > 0) {
        resizeExplorer(pageId, newExplorerWidth);
      }
    }
  }, 250);

  onVerticalUpdate = _debounce((panelWidth) => {
    const {
      pageId,
      timebarHeight,
      resizeTimebar,
      minimizeTimebar,
      timebarIsMinimized,
    } = this.props;
    const newTimebarHeight = _get(panelWidth, [1, 'size']);
    if (timebarHeight !== newTimebarHeight) {
      resizeTimebar(pageId, newTimebarHeight);
    }
    if (newTimebarHeight < minimizedTimebarHeigh && !timebarIsMinimized) {
      minimizeTimebar(pageId, true);
    } else if (newTimebarHeight > minimizedTimebarHeigh && timebarIsMinimized) {
      minimizeTimebar(pageId, false);
    }
  }, 250);

  getPageContextMenu = () => {
    const {
      windowId,
      addBlankPage,
      askOpenPage,
      openModal,
      pageId,
      askSavePage,
      pause,
      minimizeSearch,
      searchIsMinimized,
      pageViewsIdsForSearch,
      loadInSearch,
    } = this.props;
    const menuItemNew = {
      label: 'New...',
      click() {
        addBlankPage(windowId);
      },
    };
    const menuItemOpen = {
      label: 'Open...',
      click() {
        askOpenPage(windowId);
      },
    };
    const menuItemEdit = {
      label: 'Edit...',
      click() {
        if (windowId) {
          openModal(
            windowId,
            {
              type: 'editPage',
              pageUuid: pageId,
            }
          );
        }
      },
    };
    const menuItemSave = {
      label: 'Save',
      click() {
        askSavePage(pageId);
      },
    };
    const menuItemSaveAs = {
      label: 'Save As...',
      click() {
        askSavePage(pageId, true);
      },
    };
    const SearchMenuItem = {
      label: 'Toggle Search',
      accelerator: 'CmdOrCtrl+F',
      click() {
        minimizeSearch(pageId, !searchIsMinimized);
        loadInSearch(pageId, pageViewsIdsForSearch);
        pause();
      },
    };
    return [
      SearchMenuItem,
      { type: 'separator' },
      menuItemNew,
      menuItemOpen,
      menuItemEdit,
      menuItemSave,
      menuItemSaveAs,
    ];
  };

  openExplorerTab = _memoize(tabId =>
    (e) => {
      const {
        minimizeExplorer,
        explorerIsMinimized,
        pageId,
        focusTabInExplorer,
      } = this.props;
      e.preventDefault();
      if (explorerIsMinimized) {
        minimizeExplorer(pageId, false);
      }
      focusTabInExplorer(pageId, tabId);
    }
  );

  horizontalLayout = _memoize((editorWidth, searchWidth, explorerWidth) => [
    { size: editorWidth, minSize: 0, resize: 'dynamic' },
    { size: searchWidth, minSize: 0, resize: 'dynamic' },
    { resize: 'stretch' },
    { size: explorerWidth, minSize: 0, resize: 'dynamic' },
  ], (editorWidth, searchWidth, explorerWidth) => `${editorWidth}:${searchWidth}:${explorerWidth}`);

  verticalLayout = _memoize(timebarHeight => [
    { resize: 'stretch' },
    { size: timebarHeight, minSize: 0, resize: 'dynamic' },
  ]);

  willMinimizeEditor = (e) => {
    e.preventDefault();
    const {
      minimizeEditor,
      editorIsMinimized,
      pageId,
    } = this.props;
    minimizeEditor(pageId, !editorIsMinimized);
  }

  willMinimizeSearch = (e) => {
    e.preventDefault();
    const {
      minimizeSearch,
      searchIsMinimized,
      pageId,
    } = this.props;
    minimizeSearch(pageId, !searchIsMinimized);
  }

  willMinimizedExplorer = (e) => {
    e.preventDefault();
    const {
      minimizeExplorer,
      explorerIsMinimized,
      pageId,
    } = this.props;
    minimizeExplorer(pageId, !explorerIsMinimized);
  }

  willMinimizeTimebar = (e) => {
    e.preventDefault();
    const {
      pageId,
      minimizeTimebar,
    } = this.props;
    minimizeTimebar(pageId, true);
  }

  closeModal = (choiceOrEvent) => {
    const { windowId, closeModal, modal } = this.props;
    const choice = _.hasIn('preventDefault', choiceOrEvent) ? undefined : choiceOrEvent;
    closeModal(windowId, { ...modal, opened: false }, choice);
  }

  modalClosed = () => {
    const { windowId, modalClosed, modal } = this.props;
    modalClosed(windowId, modal);
  }

  handleAuxClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
  }

  /**
   * @returns {*}
   */
  // eslint-disable-next-line complexity
  render() {
    const {
      pageId,
      windowId,
      isHelpDisplayed,
      // sizes
      containerWidth,
      containerHeight,
      editorWidth,
      editorIsMinimized,
      searchWidth,
      searchIsMinimized,
      timebarHeight,
      explorerWidth,
      explorerIsMinimized,
      timebarIsMinimized,
      modal,
    } = this.props;
    logger.debug('render');

    const pageMenu = this.getPageContextMenu();

    let editorSize = editorIsMinimized ? 0 : editorWidth;
    if (!editorIsMinimized && editorSize < 50) {
      editorSize = defaultEditorWidth;
    }
    let searchSize = searchIsMinimized ? 0 : searchWidth;
    if (!searchIsMinimized && searchSize < 50) {
      searchSize = defaultSearchWidth;
    }
    let explorerSize = explorerIsMinimized ? 17 : explorerWidth;
    if (!explorerIsMinimized && explorerSize < 50) {
      explorerSize = defaultExplorerWidth;
    }
    const height = containerHeight - tabsContainerStyle.height;
    const calcTimebarHeight = timebarIsMinimized ? minimizedTimebarHeigh : timebarHeight;
    const centralWidth = containerWidth
      - editorSize
      - searchSize
      - explorerSize
      - (resizeHandleSize * 2);
    const viewsHeight = height - calcTimebarHeight - resizeHandleSize;
    // editor
    const editor = editorIsMinimized
      ? (
        <div
          className={classnames(styles.editorContainerCollapsed)}
        />
      )
      :
      (
        <div className={styles.editorContainer}>
          <button
            className={classnames('panel-editor-button', styles.barButtonLeft)}
            onClick={this.willMinimizeEditor}
            title="Collapse editor"
          >
            <Glyphicon
              glyph="minus"
            />
          </button>
          <EditorContainer pageId={pageId} />
        </div>
      );

    // search
    const search = searchIsMinimized
      ? (
        <div
          className={classnames(styles.searchContainerCollapsed)}
        />
      )
      :
      (
        <div className={styles.searchContainer}>
          <button
            className={classnames('panel-search-button', styles.barButtonLeft)}
            onClick={this.willMinimizeSearch}
            title="Collapse search"
          >
            <Glyphicon
              glyph="minus"
            />
          </button>
          <SearchContainer pageId={pageId} />
        </div>
      );

    // views
    const views = centralWidth < 1
      ? <div />
      // <Page className="s100" style={{ backgroundColor: 'red' }} // TODO boxmode restore dropable
      // windowId={windowId} pageId={pageId} />;
      : (
        <ContentContainer
          windowId={windowId}
          pageId={pageId}
          width={centralWidth - scrollHandleSize}
          height={viewsHeight}
        />
      );

    // timebar
    const timebar = timebarIsMinimized
      ?
      (
        <TimebarCollapsedContainer
          pageId={pageId}
          width={centralWidth}
          height={calcTimebarHeight}
        />
      )
      : (
        <div className="h100 w100">
          <button
            className={classnames('panel-button', styles.barButton, styles.verticalBarButton)}
            onClick={this.willMinimizeTimebar}
            title="Collapse timebar"
          >
            <Glyphicon
              glyph="minus"
            />
          </button>
          <TimebarMasterContainer
            windowId={windowId}
            pageId={pageId}
            width={centralWidth}
            height={timebarHeight}
          />
        </div>
      );

    // explorer
    const explorer = explorerIsMinimized
      ? (
        <div
          className={styles.verticalBarRight}
        >
          <button
            className={classnames('panel-button', 'panel-button-expand', styles.barButtonRight)}
            onClick={this.willMinimizedExplorer}
            title="Expand explorer"
          >
            &#9633;
          </button>
          {
            explorerWidgets.map(widget =>
              <button
                key={widget[2]}
                className={classnames('panel-button', 'panel-button-expand', styles.barButtonRight)}
                onClick={this.openExplorerTab(widget[2])}
                title={`Open ${widget[1]} in explorer`}
              >
                <b>{widget[0]}</b>
              </button>
            )
          }
        </div>
      )
      :
      (
        <div className={styles.explorerContainer}>
          <ExplorerContainer windowId={windowId} pageId={pageId} />
          <div
            className={styles.verticalBarRight}
          >
            <button
              className={classnames('panel-button', styles.barButtonRight)}
              onClick={this.willMinimizedExplorer}
              title="Collapse explorer"
            >
              <Glyphicon
                glyph="minus"
              />
            </button>
            {
              explorerWidgets.map(widget =>
                <button
                  key={widget[2]}
                  className={classnames('panel-button', 'panel-button-expand', styles.barButtonRight)}
                  onClick={this.openExplorerTab(widget[2])}
                  title={`Open ${widget[1]} in explorer`}
                >
                  <b>{widget[0]}</b>
                </button>
              )
            }
          </div>
        </div>
      );

    const modalComponent = modal ?
      (
        <ModalGeneric
          isOpened={modal.opened}
          onClose={this.closeModal}
          onExited={this.modalClosed}
          props={modal}
        />
      )
      : null;

    return (
      <div
        className={styles.container}
      >
        {isHelpDisplayed ? <HelpContentContainer /> : ''}
        {modalComponent}
        <div
          style={tabsContainerStyle}
        >
          <MessagesContainer />
          <TabsContainer className={styles.tabs} windowId={windowId} focusedPageId={pageId} />
        </div>
        { !pageId &&
        <NoPageContainer
          windowId={windowId}
        />
        }
        { pageId &&
        <div
          className={classnames('h100', 'w100', 'posRelative', styles.panelsContainer)}
          onContextMenu={() => handleContextMenu(pageMenu)}
        >
          <PanelGroup
            direction="row"
            spacing={resizeHandleSize}
            borderColor={panelBorderColor}
            panelWidths={this.horizontalLayout(editorSize, searchSize, explorerSize)}
            onUpdate={this.onHorizontalUpdate}
          >
            {editor}
            {search}
            <PanelGroup
              direction="column"
              spacing={timebarIsMinimized ? 0 : 17}
              borderColor={panelBorderColor}
              panelWidths={this.verticalLayout(calcTimebarHeight)}
              onUpdate={this.onVerticalUpdate}
            >
              {views}
              {timebar}
            </PanelGroup>
            {explorer}
          </PanelGroup>
        </div>
        }
      </div>
    );
  }
}

export default withDimensions({
  debounce: 100,
  elementResize: true,
  containerStyle: {
    width: '100%',
    height: '100%',
  },
})(Window);
