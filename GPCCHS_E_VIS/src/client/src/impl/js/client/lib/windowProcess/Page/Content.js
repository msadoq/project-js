import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import { WidthProvider, Responsive } from 'react-grid-layout';
import ViewContainer from '../View/ViewContainer';
import styles from './Content.css';

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
    focusedPage: PropTypes.object.isRequired,
    layouts: PropTypes.object.isRequired,
    views: PropTypes.array,
    viewOpenedInEditor: PropTypes.string,
    unmountAndRemove: PropTypes.func,
    openEditor: PropTypes.func,
    closeEditor: PropTypes.func,
    isEditorOpened: PropTypes.bool,
    updateLayout: PropTypes.func,
  };
  constructor(...args) {
    super(...args);
    this.onLayoutChange = this.onLayoutChange.bind(this);

    // static objects to avoid too many renders
    this.breakpoints = { lg: 1200 };
    this.cols = { lg: 12 };
  }
  onLayoutChange(layout) {
    if (!this.props.updateLayout) {
      return;
    }

    const newLayout = _.map(layout, block => _.omit(block, filterLayoutBlockFields));
    this.props.updateLayout(newLayout);
  }
  render() {
    const { focusedPageId, focusedPage, layouts } = this.props;

    console.log('re-render page content');

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
        {_.map(this.props.views, (v) => {
          const isViewsEditorOpen =
          this.props.viewOpenedInEditor === v.viewId && this.props.isEditorOpened;

          return (
            <div className={isViewsEditorOpen ? styles.blockedited : styles.block} key={v.viewId}>
              <ViewContainer
                timebarId={focusedPage.timebarId}
                pageId={focusedPageId}
                viewId={v.viewId}
                unmountAndRemove={this.props.unmountAndRemove}
                viewOpenedInEditor={this.props.viewOpenedInEditor}
                isViewsEditorOpen={isViewsEditorOpen}
                openEditor={this.props.openEditor}
                closeEditor={this.props.closeEditor}
              />
            </div>); }
        )}
      </Grid>
    );
  }
}
