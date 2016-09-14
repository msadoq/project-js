import React, { Component, PropTypes} from 'react';
import { Col } from 'react-bootstrap';
import PageContentContainer from './PageContentContainer';
import EditorContainer from '../Editor/EditorContainer';

export default class Page extends Component {
  static propTypes = {
    windowId: PropTypes.string.isRequired,
    pageId: PropTypes.string.isRequired,
    configuration: PropTypes.object, // TODO duplication
    editor: PropTypes.object,
    openEditor: PropTypes.func,
    closeEditor: PropTypes.func,
  };
  render() {
    const isEditorOpened = (this.props.editor && this.props.editor.isOpened === true);
    const pageContentWidth = isEditorOpened ? 9 : 12;

    return (
      <div>
        {(isEditorOpened ? <Col xs={3}><EditorContainer {...this.props} /></Col> : '')}
        <Col xs={pageContentWidth}>
          <PageContentContainer {...this.props} />
        </Col>
      </div>
    );
  }
}
