import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
// import PageGrid from './PageGrid';
import { WidthProvider, Responsive } from 'react-grid-layout';
import ViewContainer from '../../containers/ViewContainer';
import EditorContainer from '../../containers/EditorContainer';

const Grid = WidthProvider(Responsive);

// TODO : factorize grid-view in proper class
// TODO : mount editor as fixed grid view
// TODO : current state is current layout (inited with props), once layout is moved a "modified" state is set to true, * is displayed in page tab, click on save will send it to hss
// TODO : geometry is set on page per each view
// TODO : remove AddView and add add window and add page in electron menu bar

export default class Page extends Component {
  static propTypes = {
    page: PropTypes.object.isRequired,
    views: PropTypes.array.isRequired,
    layout: PropTypes.array.isRequired,
  };
  render() {
    const isEditorOpened = (this.props.editor
      && this.props.editor.opened === true);

    console.log(this.props);

    const layouts = {
      lg: _.map(this.props.layout, e => ({
        i: e.viewId,
        x: e.x,
        y: e.y,
        w: e.w,
        h: e.h,
      })),
    };

    return (
      <Grid
        layouts={layouts}
        className="layout"
        rowHeight={30}
        width={1200}
        breakpoints={{lg: 1200}}
        cols={{lg: 12}}
      >
        {_.map(this.props.views, v => <div className="b" key={v.viewId}>{v.title}:{v.type}</div>)}
      </Grid>
    );
    //
    // const views = this.props.views.map(view => {
    //   return {
    //     key: viewId,
    //     geometry: v.geometry,
    //     block: (
    //       <ViewContainer
    //         key={`view-${index}`}
    //         viewId={viewId}
    //         pageId={this.props.pageId}
    //         unmountView={this.props.unmountView}
    //       />
    //     ),
    //   };
    // });

    // editor
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

    // return <div>my awesome page content</div>;
    // return (
    //   <PageGrid
    //     isEditorOpen={isEditorOpened}
    //     blocks={views}
    //   />
    // );
  }
}

Page.contextTypes = {
  store: React.PropTypes.object.isRequired,
};
