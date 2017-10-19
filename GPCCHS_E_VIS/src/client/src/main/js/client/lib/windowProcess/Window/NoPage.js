import React, { PureComponent, PropTypes } from 'react';
import path from 'path';
import _ from 'lodash/fp';
import _get from 'lodash/get';
import classnames from 'classnames';
import { main } from '../ipc';
import DroppableContainer from '../common/DroppableContainer';
import MessagesContainer from '../common/MessagesContainer';
import styles from './NoPage.css';

const droppableContainerStyle = {
  overflowY: 'scroll',
  width: '100%',
};

const getDropItemType = _.cond([
  [m => /ViewDoc$/i.test(m), () => 'view'],
  [m => /PageDoc$/i.test(m), () => 'page'],
  [m => /WorkspaceDoc$/i.test(m), () => 'workspace'],
  [_.stubTrue, _.identity],
]);

class NoPage extends PureComponent {

  static propTypes = {
    windowId: PropTypes.string.isRequired,
    askOpenPage: PropTypes.func.isRequired,
    addMessage: PropTypes.func.isRequired,
  };

  onDrop = (e) => { // eslint-disable-line class-methods-use-this
    const {
      askOpenPage,
      addMessage,
      windowId,
    } = this.props;
    const data = e.dataTransfer.getData('text/plain');
    const content = JSON.parse(data);
    const filePath = path.join(
      global.parameters.get('ISIS_DOCUMENTS_ROOT'),
      _get(content, 'filepath', '') || _get(content, 'filePath', '')
    );

    const type = getDropItemType(content.mimeType);
    _.cond([
      [
        _.eq('view'),
        () => {
          addMessage(
            windowId,
            'danger',
            'Impossible to drop view because there is no page'
          );
        },
      ],
      [_.eq('page'), () => askOpenPage(filePath)],
      [_.eq('workspace'), () => main.openWorkspace({
        absolutePath: path.join(
          global.parameters.get('ISIS_DOCUMENTS_ROOT'),
          _.getOr(_.get('filepath', content), 'filePath', content)
        ),
      })],
      [
        _.stubTrue,
        () => {
          addMessage(
            windowId,
            'danger',
            `Unsupported mime type: "${type}", supported mime type are ViewDoc, PageDoc and WorkspaceDoc`
          );
        },
      ],
    ])(type);
  }

  render() {
    return (
      <DroppableContainer onDrop={this.onDrop} style={droppableContainerStyle}>
        <MessagesContainer
          containerId={this.props.windowId}
        />
        <div className={classnames('w100', 'h100', styles.noPage)}><br /><br />No page ...</div>
      </DroppableContainer>
    );
  }
}

export default NoPage;
