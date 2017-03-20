import React, { PureComponent, PropTypes } from 'react';
import getLogger from 'common/log';
import Dimensions from '../common/Dimensions';
import HelpContent from '../Navigation/HelpContent';
import MessagesContainer from '../Navigation/MessagesContainer';
import TabsContainer from '../Navigation/TabsContainer';
import EditorContainer from '../Editor/EditorContainer';
import Page from '../Page/Page';
import TimebarMasterContainer from '../Timebar/TimebarMasterContainer';
import ExplorerContainer from '../Explorer/ExplorerContainer';

import styles from './Window.css';

const logger = getLogger('Window');

class Window extends PureComponent {
  static propTypes = {
    windowId: PropTypes.string.isRequired,
    pageId: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    isHelpDisplayed: PropTypes.bool,
    setIsLoaded: PropTypes.func.isRequired,
    displayHelp: PropTypes.func.isRequired,
    // sizes
    containerWidth: PropTypes.number,
    containerHeight: PropTypes.number,
    editorWidth: PropTypes.number,
    timebarHeight: PropTypes.number,
    explorerWidth: PropTypes.number,
  };

  static defaultProps = {
    isHelpDisplayed: false,
    // sizes
    containerWidth: 500,
    containerHeight: 500,
    editorWidth: 0,
    timebarHeight: 250,
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

  closeHelpShortCut = (e) => {
    if (e.keyCode === 27 && this.props.isHelpDisplayed) {
      e.preventDefault();
      const { displayHelp, windowId, isHelpDisplayed } = this.props;
      displayHelp(windowId, !isHelpDisplayed);
    }
  }

  render() {
    logger.debug('render');
    const {
      pageId,
      windowId,
      title,
      isHelpDisplayed,
      // sizes
      containerWidth,
      containerHeight,
      editorWidth,
      timebarHeight,
      explorerWidth,
    } = this.props;

    // console.log(
    //   containerWidth,
    //   containerHeight,
    //   editorWidth,
    //   timebarHeight,
    //   explorerWidth
    // );

    // left panel
    const editor = editorWidth < 1
      ? ''
      : (
        <div
          style={{
            height: '100%',
            width: `${editorWidth}px`,
            display: 'inline-block',
            backgroundColor: 'red',
            flex: '1 1 auto',
            alignSelf: 'auto',
          }}
        >
          <EditorContainer pageId={pageId} />
        </div>
      );

    // timebar
    const timebar = timebarHeight < 1
      ? ''
      : (
        <div
          style={{
            height: `${timebarHeight}px`,
            width: '100%',
            display: 'inline-block',
            backgroundColor: 'purple',
          }}
        >
          <TimebarMasterContainer windowId={windowId} focusedPageId={pageId} />
        </div>
      );

    // central panel
    const centralWidth = containerWidth - editorWidth - explorerWidth;
    const viewsWidth = containerHeight - timebarHeight;
    const central = centralWidth < 1
      ? ''
      : (
        <div
          style={{
            height: '100%',
            width: `${centralWidth}px`,
            display: 'inline-block',
            backgroundColor: 'orange',
            flex: '1 1 auto',
            alignSelf: 'auto',
          }}
        >
          <div style={{ height: `${viewsWidth}px` }}>
            <Page windowId={windowId} pageId={pageId} />
          </div>
          {timebar}
        </div>
      );

    // right panel
    const explorer = explorerWidth < 1
      ? ''
      : (
        <div
          style={{
            height: '100%',
            width: `${explorerWidth}px`,
            display: 'inline-block',
            backgroundColor: 'yellow',
            flex: '1 1 auto',
            alignSelf: 'auto',
          }}
        >
          <ExplorerContainer windowId={windowId} pageId={pageId} />
        </div>
      );

    return (
      <div className={styles.container}>
        {isHelpDisplayed ? <HelpContent /> : ''}
        <div>
          <MessagesContainer />
          <div
            style={{
              zIndex: '2',
              width: '255px',
              height: '40px',
              padding: '5px',
              color: 'white',
              border: '1px solid grey',
              position: 'absolute',
              top: '5px',
              right: '5px',
              backgroundColor: 'darkgrey',
            }}
          >
            <div>
              editor|central|explorer:
              {editorWidth} + {centralWidth} + {explorerWidth} = {containerWidth}
            </div>
            <div>
              views|timebar: ?? + {timebarHeight} = {containerHeight}
            </div>
          </div>
          <TabsContainer
            className={styles.tabs}
            windowId={windowId}
            focusedPageId={pageId}
            title={title}
          />
        </div>
        <div className={styles.content}>
          {editor}
          {central}
          {explorer}
        </div>
      </div>
    );
  }
}

export default Dimensions({
  debounce: 100,
  elementResize: true,
})(Window);
