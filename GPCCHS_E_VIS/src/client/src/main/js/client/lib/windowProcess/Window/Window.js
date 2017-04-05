import React, { PureComponent, PropTypes } from 'react';
import PanelGroup from 'react-panelgroup';
import _memoize from 'lodash/memoize';
import _debounce from 'lodash/debounce';
import _get from 'lodash/get';
import getLogger from 'common/log';
import Dimensions from '../common/Dimensions';
import HelpContent from '../Navigation/HelpContent';
import MessagesContainer from '../Navigation/MessagesContainer';
import TabsContainer from '../Navigation/TabsContainer';
import EditorContainer from '../Editor/EditorContainer';
// import Page from '../Page/Page';
import ContentContainer from '../Page/ContentContainer';
import TimebarMasterContainer from '../Timebar/TimebarMasterContainer';
import TimebarCollapsedContainer from '../Timebar/TimebarCollapsedContainer';
import ExplorerContainer from '../Explorer/ExplorerContainer';

import styles from './Window.css';

const logger = getLogger('Window');

const resizeHandleSize = 15;
const scrollHandleSize = 15;
const defaultExplorerWidth = 250;
const defaultEditorWidth = 250;

class Window extends PureComponent {
  static propTypes = {
    windowId: PropTypes.string.isRequired,
    pageId: PropTypes.string.isRequired,
    isHelpDisplayed: PropTypes.bool,
    setIsLoaded: PropTypes.func.isRequired,
    displayHelp: PropTypes.func.isRequired,
    // sizes
    containerWidth: PropTypes.number,
    containerHeight: PropTypes.number,
    editorWidth: PropTypes.number,
    editorIsMinimized: PropTypes.bool,
    timebarHeight: PropTypes.number,
    timebarCollapsed: PropTypes.bool,
    explorerIsMinimized: PropTypes.bool,
    explorerWidth: PropTypes.number,
    resizeEditor: PropTypes.func.isRequired,
    resizeTimebar: PropTypes.func.isRequired,
    resizeExplorer: PropTypes.func.isRequired,
    minimizeExplorer: PropTypes.func.isRequired,
    minimizeEditor: PropTypes.func.isRequired,
  };

  static defaultProps = {
    isHelpDisplayed: false,
    // sizes
    containerWidth: 500,
    containerHeight: 500,
    editorWidth: defaultEditorWidth,
    editorIsMinimized: true,
    timebarHeight: 250,
    timebarCollapsed: false,
    explorerWidth: defaultExplorerWidth,
    explorerIsMinimized: true,
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
    document.addEventListener('keydown', this.closeHelpShortCut);
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

  onHorizontalUpdate = (panelWidth) => {
    if (this.leftBarEl) {
      this.leftBarEl.style.left = `${panelWidth[0].size}px`;
    }
    if (this.rightBarEl) {
      this.rightBarEl.style.right = `${panelWidth[2].size}px`;
    }
    if (this.middleBarEl) {
      this.middleBarEl.style.width = panelWidth[1].size ?
        `${panelWidth[1].size}px` : this.middleBarEl.style.width;
      this.middleBarEl.style.left = panelWidth[0].size ?
        `${panelWidth[0].size + resizeHandleSize}px` : this.middleBarEl.style.left;
    }

    this.onHorizontalUpdateDebounce(panelWidth);
  }

  onVerticalUpdateDebounce = _debounce((panelWidth) => {
    const { pageId, timebarHeight, resizeTimebar } = this.props;
    const newTimebarHeight = _get(panelWidth, [1, 'size']);
    if (timebarHeight !== newTimebarHeight) {
      resizeTimebar(pageId, newTimebarHeight);
    }
  }, 250);

  onVerticalUpdate = (panelWidth) => {
    if (this.middleBarEl) {
      this.middleBarEl.style.top = panelWidth[0].size ?
      `${panelWidth[0].size}px` : this.middleBarEl.style.top;
    }

    this.onVerticalUpdateDebounce(panelWidth);
  }

  horizontalLayout = _memoize((editorWidth, explorerWidth) => [
    { size: editorWidth, minSize: 0, resize: 'dynamic' },
    { resize: 'stretch' },
    { size: explorerWidth, minSize: 0, resize: 'dynamic' },
  ], (editorWidth, explorerWidth) => `${editorWidth}:${explorerWidth}`);

  verticalLayout = _memoize(timebarHeight => [
    { resize: 'stretch' },
    { size: timebarHeight, minSize: 0, resize: 'dynamic' },
  ]);

  closeHelpShortCut = (e) => {
    if (e.keyCode === 27 && this.props.isHelpDisplayed) {
      e.preventDefault();
      const { displayHelp, windowId, isHelpDisplayed } = this.props;
      displayHelp(windowId, !isHelpDisplayed);
    }
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
      timebarCollapsed,
    } = this.props;
    logger.debug('render');

    let editorSize = editorIsMinimized ? 0 : editorWidth;
    if (!editorIsMinimized && editorSize < 50) {
      editorSize = defaultEditorWidth;
    }
    let explorerSize = explorerIsMinimized ? 0 : explorerWidth;
    if (!explorerIsMinimized && explorerSize < 50) {
      explorerSize = defaultExplorerWidth;
    }
    const calcTimebarHeight = timebarCollapsed ? 34 : timebarHeight;
    const centralWidth = containerWidth - editorSize - explorerSize - (resizeHandleSize * 2);
    const viewsHeight = containerHeight - calcTimebarHeight - resizeHandleSize;

    // editor
    const editor = editorIsMinimized
      ? <div />
      : <EditorContainer pageId={pageId} />;

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
    const timebar = timebarCollapsed
      ?
        (
          <TimebarCollapsedContainer
            pageId={pageId}
            width={centralWidth}
            height={calcTimebarHeight}
          />
        )
      : (
        <TimebarMasterContainer
          windowId={windowId}
          pageId={pageId}
          width={centralWidth}
          height={calcTimebarHeight}
        />
      );

    // explorer
    const explorer = explorerIsMinimized
      ? <div />
      : <ExplorerContainer windowId={windowId} pageId={pageId} />;

    return (
      <div
        className={styles.container}
      >
        {isHelpDisplayed ? <HelpContent /> : ''}
        <div>
          <MessagesContainer />
          <TabsContainer className={styles.tabs} windowId={windowId} focusedPageId={pageId} />
        </div>
        <div
          className="h100 w100 posRelative"
        >
          <PanelGroup
            direction="row"
            spacing={resizeHandleSize}
            borderColor="grey"
            panelWidths={this.horizontalLayout(editorSize, explorerSize)}
            onUpdate={this.onHorizontalUpdate}
          >
            {editor}
            <PanelGroup
              direction="column"
              spacing={resizeHandleSize}
              borderColor="grey"
              panelWidths={this.verticalLayout(calcTimebarHeight)}
              onUpdate={this.onVerticalUpdate}
            >
              {views}
              {timebar}
            </PanelGroup>
            {explorer}
          </PanelGroup>
          <div
            ref={(el) => { this.leftBarEl = el; }}
            style={{
              background: 'transparent',
              height: '100%',
              position: 'absolute',
              width: `${resizeHandleSize}px`,
              top: 0,
            }}
          />
          <div
            ref={(el) => { this.rightBarEl = el; }}
            style={{
              background: 'transparent',
              height: '100%',
              position: 'absolute',
              width: `${resizeHandleSize}px`,
              top: 0,
            }}
          />
          <div
            ref={(el) => { this.middleBarEl = el; }}
            style={{
              background: 'transparent',
              height: `${resizeHandleSize}px`,
              position: 'absolute',
            }}
          />
        </div>
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
