import React, { Component, PropTypes } from 'react';
import { Col } from 'react-bootstrap';
import ContentContainer from './ContentContainer';
import EditorContainer from '../Editor/EditorContainer';

const cols = 12;
const editorCols = 4;

export default class Page extends Component {
  static propTypes = {
    isEditorOpened: PropTypes.bool,
    openEditor: PropTypes.func,
    focusedPageId: PropTypes.string.isRequired
  };
  render() {
    const { focusedPageId } = this.props;
    const pageContentWidth = this.props.isEditorOpened ? cols - editorCols : cols;
    return (
      <div>
        {(this.props.isEditorOpened
          ? <Col xs={editorCols}>
            <EditorContainer focusedPageId={focusedPageId} />
          </Col>
          : '')}
        <Col xs={pageContentWidth}>
          <ContentContainer {...this.props} />
        </Col>
      </div>
    );
  }
}
