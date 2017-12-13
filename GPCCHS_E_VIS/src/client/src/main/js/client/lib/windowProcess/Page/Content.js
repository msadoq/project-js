import _ from 'lodash/fp';
import _get from 'lodash/get';
import React, { PureComponent, PropTypes } from 'react';
import _omit from 'lodash/omit';
import classnames from 'classnames';
import Grid from 'react-grid-layout';
import path from 'path';
import getLogger from 'common/logManager';
import ViewContainer from '../View/ViewContainer';
import MessagesContainer from '../common/MessagesContainer';
import DroppableContainer from '../common/DroppableContainer';
import styles from './Content.css';
import { main } from '../ipc';

const logger = getLogger('Content');

const containerPadding = [0, 0];

const filterLayoutBlockFields = [
  'minW',
  'minH',
  'isDraggable',
  'isResizable',
  'moved',
  'static',
];

const getDropItemType = _.cond([
  [m => /ViewDoc$/i.test(m), () => 'view'],
  [m => /PageDoc$/i.test(m), () => 'page'],
  [m => /WorkspaceDoc$/i.test(m), () => 'workspace'],
  [_.stubTrue, _.identity],
]);

const droppableContainerStyle = {
  overflowY: 'scroll',
  width: '100%',
};

export default class Content extends PureComponent {
  static propTypes = {
    pageId: PropTypes.string.isRequired,
    timebarUuid: PropTypes.string,
    layouts: PropTypes.shape({
      lg: PropTypes.array,
    }).isRequired,
    views: PropTypes.arrayOf(PropTypes.shape({
      type: PropTypes.string,
      viewId: PropTypes.string,
    })).isRequired,
    updateLayout: PropTypes.func.isRequired,
    windowId: PropTypes.string.isRequired,
    maximizedViewUuid: PropTypes.string,
    width: PropTypes.number,
    askOpenPage: PropTypes.func.isRequired,
    askOpenView: PropTypes.func.isRequired,
    addMessage: PropTypes.func.isRequired,
  };

  static defaultProps = {
    timebarUuid: null,
    maximizedViewUuid: null,
    width: 50,
  }

  onResizeView = (layout = [], oldItem, layoutItem) => {
    const newLayout = layout.map(block => _omit(block, filterLayoutBlockFields));
    if (!_.isEqual(oldItem, layoutItem)) {
      this.props.updateLayout(newLayout);
    }
  };

  onDrop = (e) => { // eslint-disable-line class-methods-use-this
    const {
      askOpenView,
      askOpenPage,
      addMessage,
      pageId,
    } = this.props;
    const data = e.dataTransfer.getData('text/plain');
    const content = JSON.parse(data);
    const filePath = path.join(
      global.parameters.get('ISIS_DOCUMENTS_ROOT'),
      _get(content, 'filepath', '') || _get(content, 'filePath', '')
    );

    const type = getDropItemType(content.mimeType);
    _.cond([
      [_.eq('view'), () => askOpenView(filePath)],
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
            pageId,
            'danger',
            `Unsupported mime type: "${type}", supported mime type are ViewDoc, PageDoc and WorkspaceDoc`
          );
        },
      ],
    ])(type);
  }

  render() {
    logger.debug('render');

    const {
      pageId,
      windowId,
      views,
      timebarUuid,
      layouts,
      maximizedViewUuid,
      width,
    } = this.props;

    if (!views.length) {
      return (
        <DroppableContainer onDrop={this.onDrop} style={droppableContainerStyle}>
          <MessagesContainer
            containerId={pageId}
          />
          <div className={classnames('w100', styles.noPage)}><br /><br />No view yet ...</div> { /* TODO boxmodel in Window.js */ }
        </DroppableContainer>
      );
    }

    const indexMaximized = _.findIndex(i => i.i === maximizedViewUuid, layouts.lg);
    if (maximizedViewUuid && !layouts.lg[indexMaximized].collapsed) {
      return (
        <ViewContainer
          timebarUuid={timebarUuid}
          pageId={pageId}
          viewId={maximizedViewUuid}
          windowId={windowId}
          maximized
        />
      );
    }

    return (
      <DroppableContainer onDrop={this.onDrop} style={droppableContainerStyle}>
        <MessagesContainer
          containerId={pageId}
        />
        <Grid
          layout={layouts.lg}
          className="layout"
          rowHeight={30}
          width={width}
          containerPadding={containerPadding}
          cols={12}
          draggableHandle=".moveHandler"
          onResizeStop={this.onResizeView}
          onDragStop={this.onResizeView}
        >
          {views.map(v => (
            <div
              key={v.viewId}
              className={
                layouts.lg.find(l => l.i === v.viewId && l.collapsed)
                ?
                'collapsed-grid-layout' : null
              }
            >
              <ViewContainer
                key={v.viewId}
                timebarUuid={timebarUuid}
                pageId={pageId}
                viewId={v.viewId}
                windowId={windowId}
              />
            </div>
          ))}
        </Grid>
      </DroppableContainer>
    );
  }
}
