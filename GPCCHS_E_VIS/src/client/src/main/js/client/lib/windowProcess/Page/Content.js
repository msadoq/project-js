import _ from 'lodash/fp';
import React, { PureComponent, PropTypes } from 'react';
import _omit from 'lodash/omit';
import classnames from 'classnames';
import Grid from 'react-grid-layout';
import path from 'path';
import getLogger from 'common/log';
import ViewContainer from '../View/ViewContainer';
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
    const data = e.dataTransfer.getData('text/plain');
    const content = JSON.parse(data);

    const type = getDropItemType(content.mimeType);

    _.cond([
      [_.eq('view'), () => main.openView({
        windowId: this.props.windowId,
        absolutePath: path.join(
          global.parameters.get('ISIS_DOCUMENTS_ROOT'),
          _.getOr(_.get('filepath', content), 'filePath', content)
        ),
      })],
      [_.eq('page'), () => main.openPage({
        windowId: this.props.windowId,
        absolutePath: path.join(
          global.parameters.get('ISIS_DOCUMENTS_ROOT'),
          _.getOr(_.get('filepath', content), 'filePath', content)
        ),
      })],
      [_.eq('workspace'), () => main.openWorkspace({
        absolutePath: path.join(
          global.parameters.get('ISIS_DOCUMENTS_ROOT'),
          _.getOr(_.get('filepath', content), 'filePath', content)
        ),
      })],
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

    if (!pageId) {
      return (
        <div className={classnames('w100', styles.noPage)}><br /><br />No page ...</div> // TODO boxmodel in Window.js
      );
    }

    if (!views.length) {
      return (
        <div className={classnames('w100', styles.noPage)}><br /><br />No view yet ...</div> // TODO boxmodel in Window.js
      );
    }

    if (maximizedViewUuid) {
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
            <div key={v.viewId}>
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
