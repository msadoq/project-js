import React, { Component, PropTypes } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import ViewContainer from '../containers/ViewContainer';
import EditorContainer from '../containers/EditorContainer';
import AddView from './Page/AddView';

const GridLayout = WidthProvider(Responsive);

// TODO : factorize grid-view in proper class
// TODO : mount editor as fixed grid view
// TODO : current state is current layout (inited with props), once layout is moved a "modified" state is set to true, * is displayed in page tab, click on save will send it to hss
// TODO : geometry is set on page per each view

export default class Page extends Component {
  static propTypes = {
    pageId: PropTypes.string.isRequired,
    editor: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    views: PropTypes.array.isRequired,
    unmountView: PropTypes.func,
  };
  render() {
    const isEditorOpened = (this.props.editor
      && this.props.editor.opened === true);

    const layouts = { lg: [] };

    const cols = { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 };

    var divStyle = {
      backgroundColor: 'white',
      border: '2px solid grey',
      overflow: 'auto',
    };
    const views = this.props.views.map((viewId, index) => {
      const v = this.context.store.getState().views[viewId];
      layouts.lg.push(Object.assign({}, v.geometry, { i: viewId, minW: 2, maxW: 6, minH: 2, maxH: 6 }));
      return (
        <div key={viewId} style={divStyle}>
          <ViewContainer
            key={`view-${index}`}
            viewId={viewId}
            pageId={this.props.pageId}
            unmountView={this.props.unmountView}
          />
        </div>
      );
    });

    // toolbox
    layouts.lg.unshift({ i: 'tools', x: 12, y: 0, w: 1, h: 2, static: true });
    views.push(
      <div key='tools' style={divStyle}>
        <AddView {...this.props} />
      </div>
    );

    // editor
    const editorWidth = 3;
    if (isEditorOpened) {
      cols.lg = 12 + editorWidth;
      layouts.lg = layouts.lg.map(v => Object.assign({}, v, { x: v.x + editorWidth }));
      layouts.lg.unshift({ i: 'editor', x: 0, y: 0, w: editorWidth, h: 10, static: true });
      views.push(
        <div key='editor' className="br">
          <EditorContainer
            pageId={this.props.pageId}
            {...this.props.editor}
          />
        </div>
      );
    }

    return (
      <GridLayout
        className="layout bt"
        style={{backgroundColor: 'transparent', marginRight: -15, marginLeft: -15 }}
        layouts={layouts}
        breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0}}
        cols={cols}
        rowHeight={30}
        width={1200}
      >
        {views}
      </GridLayout>
    );
  }
}

Page.contextTypes = {
  store: React.PropTypes.object.isRequired,
};
