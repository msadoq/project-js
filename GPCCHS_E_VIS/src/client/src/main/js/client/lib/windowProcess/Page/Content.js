import React, { PureComponent, PropTypes } from 'react';
import _omit from 'lodash/omit';
import classnames from 'classnames';
import _isEqual from 'lodash/isEqual';
import { WidthProvider, Responsive } from 'react-grid-layout';
import getLogger from 'common/log';
import makeViewContainer from '../View/ViewContainer';
import styles from './Content.css';

const logger = getLogger('Content');

const Grid = WidthProvider(Responsive); // eslint-disable-line new-cap

const gridStyles = {
  containerPadding: [0, 0],
};

const filterLayoutBlockFields = [
  'minW',
  'minH',
  'isDraggable',
  'isResizable',
  'moved',
  'static',
];

export default class Content extends PureComponent {
  static propTypes = {
    focusedPageId: PropTypes.string.isRequired,
    timebarUuid: PropTypes.string.isRequired,
    layouts: PropTypes.shape({
      lg: PropTypes.array,
    }).isRequired,
    views: PropTypes.arrayOf(PropTypes.shape({
      absolutePath: PropTypes.string,
      configuration: PropTypes.object,
      isModified: PropTypes.bool,
      path: PropTypes.string,
      type: PropTypes.string,
      viewId: PropTypes.string,
    })).isRequired,
    editorViewId: PropTypes.string,
    unmountAndRemove: PropTypes.func.isRequired,
    openEditor: PropTypes.func.isRequired,
    closeEditor: PropTypes.func.isRequired,
    isEditorOpened: PropTypes.bool.isRequired,
    updateLayout: PropTypes.func.isRequired,
    windowId: PropTypes.string.isRequired,
  };

  static defaultProps = {
    editorViewId: '',
  }

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
      views = [], focusedPageId, timebarUuid,
      layouts, editorViewId, isEditorOpened,
      openEditor, closeEditor, windowId,
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
        className={classnames(
          'layout',
          styles.grid
        )}
        rowHeight={30}
        width={1200}
        containerPadding={gridStyles.containerPadding}
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
              className={classnames(
                {
                  [styles.blockedited]: isViewsEditorOpen,
                  [styles.block]: !isViewsEditorOpen,
                  collapsed: v.configuration.collapsed,
                }
              )}
              key={v.viewId}
            >
              <ViewContainer
                timebarUuid={timebarUuid}
                pageId={focusedPageId}
                viewId={v.viewId}
                windowId={windowId}
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
