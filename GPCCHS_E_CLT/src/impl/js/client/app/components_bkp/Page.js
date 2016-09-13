import React, { Component, PropTypes } from 'react';
import { Row, Col } from 'react-bootstrap';
import ViewContainer from '../containers/ViewContainer';
import EditorContainer from '../containers/EditorContainer';

export default class Page extends Component {
  static propTypes = {
    windowId: PropTypes.string.isRequired,
    pageId: PropTypes.string.isRequired,
    editor: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    views: PropTypes.array.isRequired,
  };
  render() {
    const isEditorOpened = (this.props.editor
      && this.props.editor.opened === true);
    return (
      <Row>
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
          {this.props.views.map(viewId =>
            <ViewContainer
              key={`view-${viewId}`}
              viewId={viewId}
              pageId={this.props.pageId}
            />
          )}
        </Col>
      </Row>
    );
  }
}
