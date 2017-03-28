import React, { PureComponent, PropTypes } from 'react';
import getLogger from 'common/log';
import { get } from 'common/parameters';
import __ from 'lodash/fp';
import path from 'path';

import ContentContainer from './ContentContainer';
import styles from './Page.css';
import MessagesContainer from './MessagesContainer';
import DroppableContainer from '../common/DroppableContainer';
import { main } from '../ipc';

const logger = getLogger('Page');

const getDropItemType = __.cond([
  [m => /ViewDoc$/i.test(m), () => 'view'],
  [m => /PageDoc$/i.test(m), () => 'page'],
  [m => /WorkspaceDoc$/i.test(m), () => 'workspace'],
  [__.stubTrue, __.identity],
]);

const droppableContainerStyle = {
  height: '100%',
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
};

export default class Page extends PureComponent {
  static propTypes = {
    windowId: PropTypes.string.isRequired,
    pageId: PropTypes.string.isRequired,
  };

  static childContextTypes = {
    focusedPageId: React.PropTypes.string,
  }

  getChildContext() {
    return {
      focusedPageId: this.props.pageId,
    };
  }

  onDrop = (e) => { // eslint-disable-line class-methods-use-this
    const data = e.dataTransfer.getData('text/plain');
    const content = JSON.parse(data);

    const type = getDropItemType(content.mimeType);

    __.cond([
      [__.eq('view'), () => main.openView({
        windowId: this.props.windowId,
        absolutePath: path.join(
          get('ISIS_DOCUMENTS_ROOT'),
          __.getOr(__.get('filepath', content), 'filePath', content)
        ),
      })],
      [__.eq('page'), () => main.openPage({
        windowId: this.props.windowId,
        absolutePath: path.join(
          get('ISIS_DOCUMENTS_ROOT'),
          __.getOr(__.get('filepath', content), 'filePath', content)
        ),
      })],
      [__.eq('workspace'), () => main.openWorkspace({
        absolutePath: path.join(
          get('ISIS_DOCUMENTS_ROOT'),
          __.getOr(__.get('filepath', content), 'filePath', content)
        ),
      })],
    ])(type);
  }

  render() {
    logger.debug('render');
    const {
      windowId,
      pageId,
    } = this.props;

    return (
      <div className={styles.content}>
        <MessagesContainer containerId={pageId} />
        <DroppableContainer style={droppableContainerStyle} onDrop={this.onDrop}>
          <ContentContainer windowId={windowId} pageId={pageId} />
        </DroppableContainer>
      </div>
    );
  }
}
