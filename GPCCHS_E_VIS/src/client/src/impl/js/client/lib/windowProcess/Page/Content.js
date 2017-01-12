import React, { Component, PropTypes } from 'react';
import _omit from 'lodash/omit';
import classnames from 'classnames';
import _isEqual from 'lodash/isEqual';
import { WidthProvider, Responsive } from 'react-grid-layout';
import getLogger from 'common/log';
import makeViewContainer from '../View/ViewContainer';
import styles from './Content.css';

const logger = getLogger('Content');

const Grid = WidthProvider(Responsive); // eslint-disable-line new-cap

const filterLayoutBlockFields = [
  'minW',
  'minH',
  'isDraggable',
  'isResizable',
  'moved',
  'static',
];

export default class Content extends Component {
  static propTypes = {
    focusedPageId: PropTypes.string,
    timebarId: PropTypes.string,
    layouts: PropTypes.object,
    views: PropTypes.array,
    editorViewId: PropTypes.string,
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

    if (_isEqual(newLayout, this.previousLayout)) {
      return;
    }

    this.props.updateLayout(newLayout);
    this.previousLayout = newLayout;
  };

  cols = { lg: 12 };
  breakpoints = { lg: 1200 };

  render() {
    logger.debug('render');
    const {
      views = [], focusedPageId, timebarId,
      layouts, editorViewId, isEditorOpened,
      openEditor, closeEditor
    } = this.props;

    if (!focusedPageId) {
      return (
        <div className={styles.noPage}>No page ...</div>
      );
    }

    if (!views.length) {
      return (
        <div className={styles.noPage}>No view yet ...</div>
      );
    }

    return (
      <Grid
        layouts={layouts}
        className="layout"
        rowHeight={30}
        width={1200}
        containerPadding={[0, 0]}
        breakpoints={this.breakpoints}
        cols={this.cols}
        draggableHandle=".moveHandler"
        onLayoutChange={this.onLayoutChange}
        measureBeforeMount
      >
        {views.map((v) => {
          const isViewsEditorOpen = editorViewId === v.viewId && isEditorOpened;

          // avoid React reconciliation issue when all Content child components are ViewContainer
          // and sort order with siblings change
          const ViewContainer = makeViewContainer();

          return (
            <div
              className={classnames({
                [styles.blockedited]: isViewsEditorOpen,
                [styles.block]: !isViewsEditorOpen,
                collapsed: v.isCollapsed,
              })}
              key={v.viewId}
            >
              <ViewContainer
                timebarId={timebarId}
                pageId={focusedPageId}
                viewId={v.viewId}
                unmountAndRemove={this.props.unmountAndRemove}
                isViewsEditorOpen={isViewsEditorOpen}
                openEditor={openEditor}
                closeEditor={closeEditor}
              />
            </div>);
        })}
      </Grid>
    );
  }
}
