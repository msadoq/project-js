import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import TextEditor from './TextEditor';

const TextEditorContainer = props => <TextEditor {...props} />;

TextEditorContainer.propTypes = {
  viewId: PropTypes.string.isRequired,
  viewType: PropTypes.string.isRequired,
  configuration: PropTypes.object,
  closeEditor: PropTypes.func,
};

function mapStateToProps(state, { configuration, closeEditor }) {
  return {
    entryPoints: configuration.entryPoints,
    links: configuration.links,
    defaultRatio: configuration.defaultRatio,
    content: configuration.content,
    closeEditor: closeEditor,
  };
}

export default connect(mapStateToProps)(TextEditorContainer);
