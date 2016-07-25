import React, { Component, PropTypes } from 'react';
import { Button } from 'react-bootstrap';
import styles from './Editor.css';

export default class Editor extends Component {
  static propTypes = {
    closeEditor: PropTypes.func.isRequired,
    configuration: PropTypes.any,
  };
  render() {
    return (
      <div className={styles.editor}>
        my editor here ({this.props.configuration.title}), data received for this view:
        <pre>
          {JSON.stringify(this.props.configuration)}
        </pre>
        <div>
          <Button onClick={this.props.closeEditor}>close</Button>
        </div>
      </div>
    );
  }
}
