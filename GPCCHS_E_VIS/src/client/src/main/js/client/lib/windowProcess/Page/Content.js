import React, { PureComponent, PropTypes } from 'react';
import _omit from 'lodash/omit';
import classnames from 'classnames';
import { WidthProvider, Responsive } from 'react-grid-layout';
import getLogger from 'common/log';
import ViewContainer from '../View/ViewContainer';
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
    timebarUuid: PropTypes.string,
    layouts: PropTypes.shape({
      lg: PropTypes.array,
    }).isRequired,
    views: PropTypes.arrayOf(PropTypes.shape({
      type: PropTypes.string,
      viewId: PropTypes.string,
    })).isRequired,
    editorViewId: PropTypes.string,
    closeView: PropTypes.func.isRequired,
    openEditor: PropTypes.func.isRequired,
    closeEditor: PropTypes.func.isRequired,
    isEditorOpened: PropTypes.bool.isRequired,
    updateLayout: PropTypes.func.isRequired,
    windowId: PropTypes.string.isRequired,
    maximizedViewUuid: PropTypes.string,
  };

  static defaultProps = {
    editorViewId: '',
    timebarUuid: null,
    maximizedViewUuid: null,
  }
  onResizeView = (layout = []) => {
    const newLayout = layout.map(block => _omit(block, filterLayoutBlockFields));
    this.props.updateLayout(newLayout);
  };

  cols = { lg: 12 };
  breakpoints = { lg: 1200 };

  render() {
    logger.debug('render');
    const {
      views = [], focusedPageId, timebarUuid,
      layouts, editorViewId, isEditorOpened,
      openEditor, closeEditor, windowId,
      maximizedViewUuid,
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

    if (maximizedViewUuid) {
      const isViewsEditorOpen = editorViewId === maximizedViewUuid && isEditorOpened;
      return (
        <ViewContainer
          timebarUuid={timebarUuid}
          pageId={focusedPageId}
          viewId={maximizedViewUuid}
          windowId={windowId}
          closeView={this.props.closeView}
          isViewsEditorOpen={isViewsEditorOpen}
          openEditor={openEditor}
          closeEditor={closeEditor}
          maximized
        />
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
        onResizeStop={this.onResizeView}
        onDragStop={this.onResizeView}
        measureBeforeMount
      >
        {views.map((v) => {
          const isViewsEditorOpen = editorViewId === v.viewId && isEditorOpened;

          return (
            <div
              className={classnames(
                {
                  [styles.blockedited]: isViewsEditorOpen,
                  [styles.block]: !isViewsEditorOpen,
                }
              )}
              key={v.viewId}
            >
              <ViewContainer
                key={v.viewId}
                timebarUuid={timebarUuid}
                pageId={focusedPageId}
                viewId={v.viewId}
                windowId={windowId}
                closeView={this.props.closeView}
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
