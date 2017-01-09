import React, { Component, PropTypes } from 'react';
import getLogger from 'common/log';

import Debug from '../Navigation/Debug';
import TimebarMasterContainer from '../Timebar/TimebarMasterContainer';
import MessagesContainer from './MessagesContainer';
import PageContainer from '../Page/PageContainer';
import TabsContainer from '../Navigation/TabsContainer';
import Help from '../common/Help';
import styles from './Window.css';

const logger = getLogger('Window');


export default class Window extends Component {
  static propTypes = {
    windowId: PropTypes.string.isRequired,
    focusedPageId: PropTypes.string,
    title: PropTypes.string,
  };

  static childContextTypes = {
    windowId: PropTypes.string
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
    document.addEventListener('keydown', this.toggleHelp);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.toggleHelp);
  }

  toggleHelp = (e) => {
    if (e.keyCode === 72 && e.ctrlKey) {
      this.setState({
        displayHelp: !this.state.displayHelp,
      });
    } else if (e.keyCode === 27 && this.state.displayHelp) {
      this.setState({
        displayHelp: false,
      });
    }
  }

  render() {
    logger.debug('render');
    const { focusedPageId, windowId, title } = this.props;

    return (
      <div className={styles.container}>
        <Debug
          windowId={windowId}
          focusedPageId={focusedPageId}
        />
        <MessagesContainer />
        <TabsContainer
          className="col-xs-12"
          windowId={windowId}
          focusedPageId={focusedPageId}
          title={title}
        />
        {this.state.displayHelp && <Help />}
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
