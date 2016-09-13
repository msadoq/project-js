import React, { Component, PropTypes } from 'react';
import { Button } from 'react-bootstrap';

export default class Editor extends Component {
  static propTypes = {
    windowId: PropTypes.string.isRequired,
    pageId: PropTypes.string.isRequired,
    editor: PropTypes.object,
    openEditor: PropTypes.func,
    closeEditor: PropTypes.func,
  };
  render() {
    return (
      <div className="b">
        <Button onClick={this.props.closeEditor}>close</Button>
        <pre>
          {JSON.stringify(this.props.editor)}
        </pre>
      </div>
    );
  }
}
