import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import { WidthProvider, Responsive } from 'react-grid-layout';
import View from '../View/View';
import styles from './Page.css';

// TODO : remove AddView and add add window and add page in electron menu bar

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
    page: PropTypes.object.isRequired,
    views: PropTypes.array.isRequired,
    layout: PropTypes.array.isRequired,
    updateLayout: PropTypes.func,
  };
  constructor(...args) {
    super(...args);
    this.onLayoutChange = this.onLayoutChange.bind(this);
  }
  render() {
    const layouts = {
      lg: _.map(this.props.layout, e => Object.assign({
        minW: 3,
        minH: 3,
      }, e)),
    };

    return (
      <Grid
        layouts={layouts}
        className="layout"
        rowHeight={30}
        width={1200}
        breakpoints={{lg: 1200}}
        cols={{lg: 12}}
        onLayoutChange={this.onLayoutChange}
      >
        {_.map(this.props.views, v =>
          <div className={styles.block} key={v.viewId}>
            <View
              viewId={v.viewId}
              type={v.type}
              configuration={v.configuration}
              unmountAndRemove={this.props.unmountAndRemove}
              openEditor={this.props.openEditor}
              closeEditor={this.props.closeEditor}
            />
          </div>
        )}
      </Grid>
    );
  }
  onLayoutChange(layouts) {
    if (!this.props.updateLayout) {
      return;
    }

    const newLayouts = _.map(layouts, block => _.omit(block, filterLayoutBlockFields));
    this.props.updateLayout(newLayouts);
  }
}
