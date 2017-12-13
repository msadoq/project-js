// ====================================================================
// HISTORY
// VERSION : 1.1.0 : : : 28/02/2017 : Initial version
// VERSION : 1.1.2 : FA : #5316 : 08/02/2017 : Lint Page Content in windowProcess folder
// VERSION : 1.1.2 : FA : #5443 : 15/02/2017 : Fix filepath prop and arrange page height for bigger drop zone
// VERSION : 1.1.2 : DM : #3622 : 20/02/2017 : Debug error on plotview when closing timebar
// VERSION : 1.1.2 : DM : #3622 : 02/03/2017 : Fix update layout in Page/Content
// VERSION : 1.1.2 : DM : #3622 : 03/03/2017 : Work on Maximize and collapse bugs
// VERSION : 1.1.2 : DM : #3622 : 03/03/2017 : Work on Maximize and collapse views
// VERSION : 1.1.2 : DM : #3622 : 06/03/2017 : Fix bug remount all views
// VERSION : 1.1.2 : DM : #3622 : 10/03/2017 : store collapsed & maximized bool in page layout
// VERSION : 1.1.2 : DM : #3622 : 13/03/2017 : Cleanup actions . . .
// VERSION : 1.1.2 : DM : #3622 : 14/03/2017 : Move general variables at top level of a view
// VERSION : 1.1.2 : DM : #5828 : 16/03/2017 : Fix View components should not re-mount after open editor
// VERSION : 1.1.2 : DM : #5828 : 16/03/2017 : Refacto collapsed maximized using selectors
// VERSION : 1.1.2 : DM : #5828 : 21/03/2017 : Fix no needed updateLayout in Page/Content
// VERSION : 1.1.2 : DM : #5828 : 23/03/2017 : Cleanup React components tree and props
// VERSION : 1.1.2 : DM : #5828 : 23/03/2017 : Draft the resizable panels and cleanup components props (views not functionnal)
// VERSION : 1.1.2 : DM : #5828 : 24/03/2017 : Remove Responsive version of react-grid-layout
// VERSION : 1.1.2 : DM : #5828 : 24/03/2017 : Cleanup React components tree and props
// VERSION : 1.1.2 : DM : #5828 : 24/03/2017 : Fix some code styles and lisibility
// VERSION : 1.1.2 : DM : #5828 : 24/03/2017 : Draft the resizable panels and cleanup components props (views not functionnal)
// VERSION : 1.1.2 : DM : #5828 : 24/03/2017 : Fix new window panels layout page views scrollability
// VERSION : 1.1.2 : DM : #5828 : 30/03/2017 : Fix drop view, page and workspace
// VERSION : 1.1.2 : DM : #5828 : 27/04/2017 : React panel bars are lighter, added the NO PAGE sentence and not displaying panels when no page.
// VERSION : 1.1.2 : DM : #5828 : 03/05/2017 : Handle the case where there is no pageId in window, not rendering panels.
// VERSION : 1.1.2 : DM : #5828 : 12/05/2017 : react-grid-layout handles are hidden when view is collapsed.
// VERSION : 1.1.2 : DM : #5828 : 14/06/2017 : Move common/log and common/parameters in client/
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 06/07/2017 : Replace ipc openPage by askOpenPage redux action
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 18/07/2017 : On open view middleware .
// VERSION : 1.1.2 : FA : ISIS-FT-2138 : 01/09/2017 : Added error message when dropped item's mime type is not supported.
// VERSION : 1.1.2 : FA : ISIS-FT-2138 : 04/09/2017 : Fixed drag and drop error : when dropped item doesn't have filePath property, error message is correctly displayed.
// END-HISTORY
// ====================================================================

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
