import React, { PureComponent, PropTypes } from 'react';
import { Glyphicon } from 'react-bootstrap';
import PanelGroup from 'react-panelgroup';
import classnames from 'classnames';
import _ from 'lodash/fp';
import _memoize from 'lodash/memoize';
import _debounce from 'lodash/debounce';
import _get from 'lodash/get';
import getLogger from '../../common/logManager';
import Dimensions from '../common/Dimensions';
import HelpContentContainer from '../Navigation/HelpContentContainer';
import MessagesContainer from '../Navigation/MessagesContainer';
import TabsContainer from '../Navigation/TabsContainer';
import EditorContainer from '../Editor/EditorContainer';
// import Page from '../Page/Page';
import ContentContainer from '../Page/ContentContainer';
import TimebarMasterContainer from '../Timebar/TimebarMasterContainer';
import TimebarCollapsedContainer from '../Timebar/TimebarCollapsedContainer';
import ExplorerContainer from '../Explorer/ExplorerContainer';
import ModalGeneric from '../common/ModalGeneric';

import styles from './Window.css';

const logger = getLogger('Window');

const resizeHandleSize = 3;
const scrollHandleSize = 15;
const defaultExplorerWidth = 250;
const defaultEditorWidth = 250;
const minimizedTimebarHeigh = 35;
const panelBorderColor = '#444';
const tabsContainerStyle = { height: 40 };

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
    timebarHeight: PropTypes.number,
    timebarIsMinimized: PropTypes.bool,
    explorerIsMinimized: PropTypes.bool,
    explorerWidth: PropTypes.number,
    resizeEditor: PropTypes.func.isRequired,
    resizeTimebar: PropTypes.func.isRequired,
    resizeExplorer: PropTypes.func.isRequired,
    minimizeExplorer: PropTypes.func.isRequired,
    minimizeEditor: PropTypes.func.isRequired,
    minimizeTimebar: PropTypes.func.isRequired,
    focusTabInExplorer: PropTypes.func.isRequired,
    modal: PropTypes.objectOf(PropTypes.shape),
    closeModal: PropTypes.func.isRequired,
  };

  static defaultProps = {
    isHelpDisplayed: false,
    // sizes
    containerWidth: 500,
    containerHeight: 500,
    editorWidth: defaultEditorWidth,
    editorIsMinimized: true,
    timebarHeight: 250,
    timebarIsMinimized: false,
    explorerWidth: defaultExplorerWidth,
    explorerIsMinimized: true,
    modal: null,
    pageId: null,
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
    setTimeout(() => setIsLoaded(windowId), 0);
  }

  onHorizontalUpdateDebounce = _debounce((panelWidth) => {
    const { pageId,
      editorWidth,
      resizeEditor,
      explorerWidth,
      resizeExplorer,
      minimizeExplorer,
      minimizeEditor,
    } = this.props;

    const newEditorWidth = _get(panelWidth, [0, 'size']);
    if (editorWidth !== newEditorWidth) {
      if (newEditorWidth < 50) {
        minimizeEditor(pageId, true);
      } else if (newEditorWidth > 0) {
        minimizeEditor(pageId, false);
        resizeEditor(pageId, newEditorWidth);
      }
    }
    const newExplorerWidth = _get(panelWidth, [2, 'size']);
    if (explorerWidth !== newExplorerWidth) {
      if (newExplorerWidth < 50) {
        minimizeExplorer(pageId, true);
      } else if (newExplorerWidth > 0) {
        minimizeExplorer(pageId, false);
        resizeExplorer(pageId, newExplorerWidth);
      }
    }
  }, 250);

  onHorizontalUpdate = _debounce((panelWidth) => {
    const { pageId,
      editorWidth,
      resizeEditor,
      explorerWidth,
      resizeExplorer,
      minimizeExplorer,
      minimizeEditor,
    } = this.props;

    const newEditorWidth = _get(panelWidth, [0, 'size']);
    if (editorWidth !== newEditorWidth) {
      if (newEditorWidth < 50) {
        minimizeEditor(pageId, true);
      } else if (newEditorWidth > 0) {
        minimizeEditor(pageId, false);
        resizeEditor(pageId, newEditorWidth);
      }
    }
    const newExplorerWidth = _get(panelWidth, [2, 'size']);
    if (explorerWidth !== newExplorerWidth) {
      if (newExplorerWidth < 50) {
        minimizeExplorer(pageId, true);
      } else if (newExplorerWidth > 0) {
        minimizeExplorer(pageId, false);
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

  horizontalLayout = _memoize((editorWidth, explorerWidth) => [
    { size: editorWidth, minSize: 0, resize: 'dynamic' },
    { resize: 'stretch' },
    { size: explorerWidth, minSize: 0, resize: 'dynamic' },
  ], (editorWidth, explorerWidth) => `${editorWidth}:${explorerWidth}`);

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
      timebarHeight,
      explorerWidth,
      explorerIsMinimized,
      timebarIsMinimized,
      modal,
    } = this.props;

    logger.debug('render');

    let editorSize = editorIsMinimized ? 0 : editorWidth;
    if (!editorIsMinimized && editorSize < 50) {
      editorSize = defaultEditorWidth;
    }
    let explorerSize = explorerIsMinimized ? 17 : explorerWidth;
    if (!explorerIsMinimized && explorerSize < 50) {
      explorerSize = defaultExplorerWidth;
    }
    const height = containerHeight - tabsContainerStyle.height;
    const calcTimebarHeight = timebarIsMinimized ? minimizedTimebarHeigh : timebarHeight;
    const centralWidth = containerWidth - editorSize - explorerSize - (resizeHandleSize * 2);
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
          <div className={classnames('w100', styles.noPage)}><br /><br />No page ...</div> // TODO boxmodel in Window.js
        }
        { pageId &&
          <div
            className={classnames('h100', 'w100', 'posRelative', styles.panelsContainer)}
          >
            <PanelGroup
              direction="row"
              spacing={resizeHandleSize}
              borderColor={panelBorderColor}
              panelWidths={this.horizontalLayout(editorSize, explorerSize)}
              onUpdate={this.onHorizontalUpdate}
            >
              {editor}
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

export default Dimensions({
  debounce: 100,
  elementResize: true,
  containerStyle: {
    width: '100%',
    height: '100%',
  },
})(Window);
