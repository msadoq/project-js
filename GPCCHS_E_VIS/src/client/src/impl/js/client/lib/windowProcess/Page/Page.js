import React, { Component, PropTypes } from 'react';
import { Col } from 'react-bootstrap';
import ContentContainer from './ContentContainer';
import Editor from '../Editor/Editor';

const cols = 12;
const editorCols = 4;

export default class Page extends Component {
  static propTypes = {
    editor: PropTypes.object,
    isEditorOpened: PropTypes.bool,
    openEditor: PropTypes.func,
    closeEditor: PropTypes.func,
  };
  render() {
    const pageContentWidth = this.props.isEditorOpened ? cols - editorCols : cols;
    return (
      <div>
        {(this.props.isEditorOpened
          ? <Col xs={editorCols}>
            <Editor closeEditor={this.props.closeEditor} {...this.props.editor} />
          </Col>
          : '')}
        <Col xs={pageContentWidth}>
          <ContentContainer {...this.props} />
        </Col>
      </div>
    );
  }
}
