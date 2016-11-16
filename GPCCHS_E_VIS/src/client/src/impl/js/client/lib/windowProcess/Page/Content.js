import React, { Component, PropTypes } from 'react';
import _omit from 'lodash/omit';
import { WidthProvider, Responsive } from 'react-grid-layout';
import makeViewContainer from '../View/ViewContainer';
import styles from './Content.css';
import debug from '../../../lib/common/debug/windowDebug';

const logger = debug('Content');

const Grid = WidthProvider(Responsive); // eslint-disable-line new-cap

const filterLayoutBlockFields = [
  'minW',
  'minH',
  'maxW',
  'maxH',
  'isDraggable',
  'isResizable',
  'moved',
  'static',
];

export default class PageContent extends Component {
  static propTypes = {
    focusedPageId: PropTypes.string.isRequired,
    timebarId: PropTypes.string.isRequired,
    layouts: PropTypes.object.isRequired,
    views: PropTypes.array,
    viewOpenedInEditor: PropTypes.string,
    unmountAndRemove: PropTypes.func,
    openEditor: PropTypes.func,
    closeEditor: PropTypes.func,
    isEditorOpened: PropTypes.bool,
    updateLayout: PropTypes.func,
  };

  onLayoutChange = (layout = []) => {
    if (!this.props.updateLayout) {
      return;
    }

    const newLayout = layout.map(block => _omit(block, filterLayoutBlockFields));
    this.props.updateLayout(newLayout);
  }

  cols = { lg: 12 };
  breakpoints = { lg: 1200 };

  render() {
    logger.debug('render');
    const {
      views = [], focusedPageId, timebarId,
      layouts, viewOpenedInEditor, isEditorOpened
    } = this.props;

    if (!focusedPageId) {
      return (
        <div className={styles.noPage}>No page ...</div>
      );
    }

    return (
      <Grid
        layouts={layouts}
        className="layout"
        rowHeight={30}
        width={1200}
        breakpoints={this.breakpoints}
        cols={this.cols}
        draggableHandle=".moveHandler"
        onLayoutChange={this.onLayoutChange}
        measureBeforeMount
      >
        {views.map((v) => {
          const isViewsEditorOpen = viewOpenedInEditor === v.viewId && isEditorOpened;

          // avoid React reconciliation issue when all Content child components are ViewContainer
          // and sort order with siblings change
          const ViewContainer = makeViewContainer();

          return (
            <div className={isViewsEditorOpen ? styles.blockedited : styles.block} key={v.viewId}>
              <ViewContainer
                timebarId={timebarId}
                pageId={focusedPageId}
                viewId={v.viewId}
                unmountAndRemove={this.props.unmountAndRemove}
                viewOpenedInEditor={this.props.viewOpenedInEditor}
                isViewsEditorOpen={isViewsEditorOpen}
                openEditor={this.props.openEditor}
                closeEditor={this.props.closeEditor}
              />
            </div>);
        })}
      </Grid>
    );
  }
}
