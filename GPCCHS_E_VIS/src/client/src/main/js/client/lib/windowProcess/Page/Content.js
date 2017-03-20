import _ from 'lodash/fp';
import React, { PureComponent, PropTypes } from 'react';
import _omit from 'lodash/omit';
import classnames from 'classnames';
import { WidthProvider, Responsive } from 'react-grid-layout';
import getLogger from 'common/log';
import ViewContainer from '../View/ViewContainer';
import styles from './Content.css';

const logger = getLogger('Content');

// TODO dbrugne : remove WidthProvider and remove Responsive ?
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
  };

  static defaultProps = {
    timebarUuid: null,
    maximizedViewUuid: null,
  }
  onResizeView = (layout = [], oldItem, layoutItem) => {
    const newLayout = layout.map(block => _omit(block, filterLayoutBlockFields));
    if (!_.isEqual(oldItem, layoutItem)) {
      this.props.updateLayout(newLayout);
    }
  };

  cols = { lg: 12 };
  breakpoints = { lg: 1200 };

  render() {
    logger.debug('render');
    const {
      views = [],
      pageId,
      timebarUuid,
      layouts,
      windowId,
      maximizedViewUuid,
    } = this.props;

    if (!pageId) {
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
        {views.map(v => (
          <div className={styles.block} key={v.viewId}>
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
    );
  }
}
