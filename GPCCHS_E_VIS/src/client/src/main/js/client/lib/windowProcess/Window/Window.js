import React, { PureComponent, PropTypes } from 'react';
import { ButtonToolbar } from 'react-bootstrap';
import getLogger from 'common/log';
import classnames from 'classnames';
import HelpContent from '../Navigation/HelpContent';
import MasterSessionContainer from '../Navigation/MasterSessionContainer';
import HealthContainer from '../Navigation/HealthContainer';
import MessagesContainer from '../Navigation/MessagesContainer';
import TabsContainer from '../Navigation/TabsContainer';
import PageContainer from '../Page/PageContainer';
import TimebarMasterContainer from '../Timebar/TimebarMasterContainer';
import ExplorerContainer from '../Explorer/ExplorerContainer';

import styles from './Window.css';

const logger = getLogger('Window');

export default class Window extends PureComponent {
  static propTypes = {
    windowId: PropTypes.string.isRequired,
    pageId: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    isHelpDisplayed: PropTypes.bool,
    setIsLoaded: PropTypes.func.isRequired,
    displayHelp: PropTypes.func.isRequired,
    editorWidth: PropTypes.number,
    timebarHeight: PropTypes.number,
    explorerWidth: PropTypes.number,
  };
  static defaultProps = {
    isHelpDisplayed: false,
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
      editorWidth,
      timebarHeight,
      explorerWidth,
    } = this.props;

    console.log(editorWidth, timebarHeight, explorerWidth);

    const explorer = explorerWidth > 0
      ? <div style={{ width: `${explorerWidth}px` }}><ExplorerContainer windowId={windowId} /></div>
      : '';

    return (
      <div className={styles.container}>
        {isHelpDisplayed ? <HelpContent /> : ''}
        <ButtonToolbar className={styles.tools}>
          <MasterSessionContainer />
          <HealthContainer windowId={windowId} />
          <MessagesContainer />
        </ButtonToolbar>
        <div className={styles.divPagesTb}>
          <div className={styles.contentDiv}>
            <div className={styles.contentDivChildPage}>
              <TabsContainer
                className={classnames(
                  styles.TabsContainer
                )}
                windowId={windowId}
                focusedPageId={pageId}
                title={title}
              />
              <div className={styles.content}>
                <PageContainer
                  windowId={windowId}
                  focusedPageId={pageId}
                />
              </div>
            </div>
            {explorer}
          </div>
          <TimebarMasterContainer
            windowId={windowId}
            focusedPageId={pageId}
          />
        </div>
      </div>
    );
  }
}
