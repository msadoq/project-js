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
    timebarHeight: PropTypes.number,
    timebarCollapsed: PropTypes.bool,
    explorerWidth: PropTypes.number,
    resizeEditor: PropTypes.func.isRequired,
    resizeTimebar: PropTypes.func.isRequired,
    resizeExplorer: PropTypes.func.isRequired,
  };

  static defaultProps = {
    isHelpDisplayed: false,
    // sizes
    containerWidth: 500,
    containerHeight: 500,
    editorWidth: 0,
    timebarHeight: 250,
    timebarCollapsed: false,
    explorerWidth: 0,
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
    const { pageId, editorWidth, resizeEditor, explorerWidth, resizeExplorer } = this.props;
    const newEditorWidth = _get(panelWidth, [0, 'size']);
    if (editorWidth !== newEditorWidth) {
      resizeEditor(pageId, newEditorWidth);
    }
    const newExplorerWidth = _get(panelWidth, [2, 'size']);
    if (explorerWidth !== newExplorerWidth) {
      resizeExplorer(pageId, newExplorerWidth);
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
      timebarHeight,
      explorerWidth,
      timebarCollapsed,
    } = this.props;
    logger.debug('render');

    // console.log(
    //   'render Window.js',
    //   `size: ${containerWidth}x${containerHeight}`,
    //   `editor: ${editorWidth}`,
    //   `timebar: ${timebarHeight}`,
    //   `explorer: ${explorerWidth}`
    // );

    const calcTimebarHeight = timebarCollapsed ? 34 : timebarHeight;
    const centralWidth = containerWidth - editorWidth - explorerWidth - (resizeHandleSize * 2);
    const viewsHeight = containerHeight - calcTimebarHeight - resizeHandleSize;

    // editor
    const editor = editorWidth < 1
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
    const explorer = explorerWidth < 1
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
            panelWidths={this.horizontalLayout(editorWidth, explorerWidth)}
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
