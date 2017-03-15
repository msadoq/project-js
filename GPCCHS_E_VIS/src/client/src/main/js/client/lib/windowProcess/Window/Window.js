import React, { PureComponent, PropTypes } from 'react';
import { ButtonToolbar } from 'react-bootstrap';
import getLogger from 'common/log';
import classnames from 'classnames';
import DebugContainer from '../Navigation/DebugContainer';
import Help from '../Navigation/Help';
import Explorer from '../Navigation/Explorer';
import HelpContent from '../Navigation/HelpContent';
import MasterSessionContainer from '../Navigation/MasterSessionContainer';
import HealthContainer from '../Navigation/HealthContainer';
import MessagesContainer from '../Navigation/MessagesContainer';
import TabsContainer from '../Navigation/TabsContainer';
import PageContainer from '../Page/PageContainer';
import TimebarMasterContainer from '../Timebar/TimebarMasterContainer';
import styles from './Window.css';
import ExplorerContainer from '../Explorer/ExplorerContainer';
// import DummyDrag from '../Navigation/DummyDrag';

const logger = getLogger('Window');

export default class Window extends PureComponent {
  static propTypes = {
    windowId: PropTypes.string.isRequired,
    focusedPageId: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    isExplorerOpened: PropTypes.bool,
    isHelpDisplayed: PropTypes.bool,
    setIsLoaded: PropTypes.func.isRequired,
    displayExplorer: PropTypes.func.isRequired,
    displayHelp: PropTypes.func.isRequired,
  };
  static defaultProps = {
    isExplorerOpened: false,
    isHelpDisplayed: false,
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
    document.addEventListener('keydown', this.toggleHelpShortCut);
    document.addEventListener('keydown', this.toggleExplorerShortCut);

    // set in store that this is window is fully loaded and ready to run
    const { setIsLoaded, windowId } = this.props;
    setTimeout(() => setIsLoaded(windowId), 0);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.toggleHelpShortCut);
    document.removeEventListener('keydown', this.toggleExplorerShortCut);
  }

  toggleHelpShortCut = (e) => {
    if (e.keyCode === 72 && e.ctrlKey) {
      this.toggleHelp();
    } else if (e.keyCode === 27 && this.props.isHelpDisplayed) {
      this.toggleHelp();
    }
  }

  toggleHelp = (e) => {
    if (e) {
      e.preventDefault();
    }

    const { displayHelp, windowId, isHelpDisplayed } = this.props;
    displayHelp(windowId, !isHelpDisplayed);
  }

  toggleExplorerShortCut = (e) => {
    if (e.keyCode === 72 && e.ctrlKey) {
      this.toggleExplorer();
    } else if (e.keyCode === 27 && this.props.isExplorerOpened) {
      this.toggleExplorer();
    }
  }

  toggleExplorer = () => {
    this.props.displayExplorer(this.props.windowId, !this.props.isExplorerOpened);
  }

  render() {
    logger.debug('render');
    const {
      focusedPageId,
      windowId,
      title,
      isExplorerOpened,
      isHelpDisplayed,
    } = this.props;

    return (
      <div className={styles.container}>
        {isHelpDisplayed ? <HelpContent /> : ''}
        <ButtonToolbar className={styles.tools}>
          <MasterSessionContainer />
          <HealthContainer windowId={windowId} />
          <MessagesContainer />
          <Help toggleHelp={this.toggleHelp} />
          <Explorer toggleExplorer={this.toggleExplorer} />
          <DebugContainer
            windowId={windowId}
            focusedPageId={focusedPageId}
          />
          {/* <DummyDrag /> */}
        </ButtonToolbar>
        <div className={styles.divPagesTb}>
          <div className={styles.contentDiv}>
            <div className={styles.contentDivChildPage}>
              <TabsContainer
                className={classnames(
                  styles.TabsContainer
                )}
                windowId={windowId}
                focusedPageId={focusedPageId}
                title={title}
              />
              <div className={styles.content}>
                <PageContainer
                  windowId={windowId}
                  focusedPageId={focusedPageId}
                />
              </div>
            </div>
            {isExplorerOpened && <div className={styles.contentDivChildExplorer}>
              <ExplorerContainer
                windowId={windowId}
              />
            </div>}
          </div>
          <TimebarMasterContainer
            windowId={windowId}
            focusedPageId={focusedPageId}
          />
        </div>
      </div>
    );
  }
}
