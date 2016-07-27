import React, { Component, PropTypes } from 'react';
import { Row, Col } from 'react-bootstrap';
import ViewContainer from '../containers/ViewContainer';
import EditorContainer from '../containers/EditorContainer';
import AddView from './Page/AddView';

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
    return (
      <Row>
        <Col xs={12}>
          <AddView {...this.props} />
        </Col>
        {isEditorOpened
          ? <Col xs={4} lg={2}>
            <EditorContainer
              pageId={this.props.pageId}
              {...this.props.editor}
            />
          </Col>
          : null}
        <Col xs={isEditorOpened ? 8 : 12} lg={isEditorOpened ? 10 : 12}>
          {this.props.views.length
            ? ''
            : <div className="text-center mt20">nothing to show</div>}
          {this.props.views.map((viewId, index) =>
            <ViewContainer
              key={`view-${index}`}
              viewId={viewId}
              pageId={this.props.pageId}
              unmountView={this.props.unmountView}
            />
          )}
        </Col>
      </Row>
    );
  }
}
