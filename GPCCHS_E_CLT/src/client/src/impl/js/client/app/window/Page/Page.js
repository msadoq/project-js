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

export default class Page extends Component {
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
    console.log(this.props);

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
            <View viewId={v.viewId} type={v.type} configuration={v.configuration} />
          </div>
        )}
      </Grid>
    );

    // TODO : mount editor as fixed grid view
    // import EditorContainer from '../../containers/EditorContainer';
    // const isEditorOpened = (this.props.editor
    //   && this.props.editor.opened === true);
    // const editorWidth = 3;
    // if (isEditorOpened) {
    //   cols.lg = 12 + editorWidth;
    //   layouts.lg = layouts.lg.map(v => Object.assign({}, v, { x: v.x + editorWidth }));
    //   layouts.lg.unshift({ i: 'editor', x: 0, y: 0, w: editorWidth, h: 10, static: true });
    //   views.push(
    //     <div key='editor' className="br">
    //       <EditorContainer
    //         pageId={this.props.pageId}
    //         {...this.props.editor}
    //       />
    //     </div>
    //   );
    // }
  }
  onLayoutChange(layouts) {
    if (!this.props.updateLayout) {
      return;
    }

    const newLayouts = _.map(layouts, block => _.omit(block, filterLayoutBlockFields));
    this.props.updateLayout(newLayouts);
  }
}

Page.contextTypes = {
  store: React.PropTypes.object.isRequired,
};
