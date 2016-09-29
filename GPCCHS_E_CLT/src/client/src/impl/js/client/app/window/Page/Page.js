import React, { Component, PropTypes} from 'react';
import { Col } from 'react-bootstrap';
import PageContentContainer from './PageContentContainer';
import EditorContainer from '../Editor/EditorContainer';
import DataConsumerContainer from '../DataConsumer/DataConsumerContainer';

const cols = 12;
const editorCols = 4;

export default class Page extends Component {
  static propTypes = {
    windowId: PropTypes.string.isRequired,
    pageId: PropTypes.string.isRequired,
    timebarId: PropTypes.string.isRequired,
    configuration: PropTypes.object, // TODO duplication
    editor: PropTypes.object,
    openEditor: PropTypes.func,
    closeEditor: PropTypes.func,
  };
  render() {
    const isEditorOpened = (this.props.editor && this.props.editor.isOpened === true);
    const pageContentWidth = isEditorOpened ? cols - editorCols : cols;

    return (
      <div>
        <DataConsumerContainer
          pageId={this.props.pageId}
          timebarId={this.props.timebarId}
        />
        {(isEditorOpened
          ? <Col xs={editorCols}>
              <EditorContainer
                viewId={this.props.editor.viewId}
                viewType={this.props.editor.viewType}
                configuration={this.props.editor.configuration}
                closeEditor={this.props.closeEditor}
              />
            </Col>
          : '')}
        <Col xs={pageContentWidth}>
          <PageContentContainer {...this.props} />
        </Col>
      </div>
    );
  }
}
