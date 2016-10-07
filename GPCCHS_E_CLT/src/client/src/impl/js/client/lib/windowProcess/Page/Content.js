import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import { WidthProvider, Responsive } from 'react-grid-layout';
import ViewContainer from '../View/ViewContainer';
import styles from './Page.css';

const Grid = WidthProvider(Responsive);

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
    focusedPage: PropTypes.object.isRequired,
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
  }
  onLayoutChange(layout) {
    if (!this.props.updateLayout) {
      return;
    }

    const newLayout = _.map(layout, block => _.omit(block, filterLayoutBlockFields));

    // TODO remove following test after
    // https://github.com/STRML/react-grid-layout/pull/328/commits/a3afd28b579140c84e1e6e849077c7b245405345
    if (_.isEqual(newLayout, this.props.focusedPage.layout)) {
      return;
    }

    this.props.updateLayout(newLayout);
  }
  render() {
    const { focusedPage } = this.props;
    const { layout } = focusedPage;

    const layouts = {
      lg: _.map(layout, e => Object.assign({
        minW: 3,
        minH: 3
      }, e)),
    };

    return (
      <Grid
        layouts={layouts}
        className="layout"
        rowHeight={30}
        width={1200}
        breakpoints={{ lg: 1200 }}
        cols={{ lg: 12 }}
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
                pageId={focusedPage.pageId}
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
