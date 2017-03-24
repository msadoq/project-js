import _ from 'lodash/fp';
import React, { PureComponent, PropTypes } from 'react';
import _omit from 'lodash/omit';
import { Responsive } from 'react-grid-layout';
import getLogger from 'common/log';
import ViewContainer from '../View/ViewContainer';
import styles from './Content.css';

const logger = getLogger('Content');

const Grid = Responsive; // eslint-disable-line new-cap

const containerPadding = [0, 0];

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

  cols = { lg: 12 };
  breakpoints = { lg: 1200 };

  render() {
    logger.debug('render');

    const {
      views,
      pageId,
      timebarUuid,
      layouts,
      windowId,
      maximizedViewUuid,
      width,
    } = this.props;

    if (!pageId) {
      return (
        <div className={styles.noPage}>No page ...</div> // TODO boxmodel in Window.js
      );
    }

    if (!views.length) {
      return (
        <div className={styles.noPage}>No view yet ...</div> // TODO boxmodel in Window.js
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
      <div className="s100" style={{ overflowY: 'scroll' }}>
        <Grid
          layouts={layouts}
          className="layout"
          rowHeight={30}
          width={width}
          containerPadding={containerPadding}
          breakpoints={this.breakpoints}
          cols={this.cols}
          draggableHandle=".moveHandler"
          onResizeStop={this.onResizeView}
          onDragStop={this.onResizeView}
          autoSize
          useCSSTransforms
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
      </div>
    );
  }
}
