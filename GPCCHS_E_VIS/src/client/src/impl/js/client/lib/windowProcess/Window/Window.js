import React, { PureComponent, PropTypes } from 'react';
import { ButtonToolbar } from 'react-bootstrap';
import getLogger from 'common/log';

import DebugContainer from '../Navigation/DebugContainer';
// import DummyDrag from '../Navigation/DummyDrag';
import Help from '../Navigation/Help';
import HelpContent from '../Navigation/HelpContent';
import MasterSessionContainer from '../Navigation/MasterSessionContainer';
import HealthContainer from '../Navigation/HealthContainer';
import MessagesContainer from '../Navigation/MessagesContainer';
import TabsContainer from '../Navigation/TabsContainer';
import PageContainer from '../Page/PageContainer';
import TimebarMasterContainer from '../Timebar/TimebarMasterContainer';
import styles from './Window.css';

const logger = getLogger('Window');

export default class Window extends PureComponent {
  static propTypes = {
    windowId: PropTypes.string.isRequired,
    focusedPageId: PropTypes.string,
    title: PropTypes.string,
  };

  static childContextTypes = {
    windowId: PropTypes.string,
  };

  state = {
    displayHelp: false,
  }

  getChildContext() {
    return {
      windowId: this.props.windowId,
    };
  }

  componentDidMount() {
    document.addEventListener('keydown', this.toggleHelpShortCut);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.toggleHelpShortCut);
  }

  toggleHelpShortCut = (e) => {
    if (e.keyCode === 72 && e.ctrlKey) {
      this.toggleHelp();
    } else if (e.keyCode === 27 && this.state.displayHelp) {
      this.toggleHelp();
    }
  }

  toggleHelp = (e) => {
    if (e) {
      e.preventDefault();
    }
    this.setState({
      displayHelp: !this.state.displayHelp,
    });
  }

  render() {
    logger.debug('render');
    const { focusedPageId, windowId, title } = this.props;
    const { displayHelp } = this.state;

    return (
      <div className={styles.container}>
        {displayHelp ? <HelpContent /> : ''}
        <ButtonToolbar className={styles.tools}>
          <MasterSessionContainer />
          <HealthContainer />
          <MessagesContainer />
          <Help toggleHelp={this.toggleHelp} />
          <DebugContainer
            windowId={windowId}
            focusedPageId={focusedPageId}
            toggleHelp={this.toggleHelp}
          />
          {/* <DummyDrag /> */}
        </ButtonToolbar>
        <TabsContainer
          className="col-xs-12"
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
        <TimebarMasterContainer
          windowId={windowId}
          focusedPageId={focusedPageId}
        />
      </div>
    );
  }
}
