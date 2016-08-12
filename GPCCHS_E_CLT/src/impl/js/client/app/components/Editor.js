import React, { Component, PropTypes } from 'react';
import { Button } from 'react-bootstrap';
import styles from './Editor.css';

import { Row, Col } from 'react-bootstrap';
import ToggleSub from './Editor/ToggleSub';

export default class Editor extends Component {
  static propTypes = {
    closeEditor: PropTypes.func.isRequired,
  };
  /* render() {
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
  }*/
  render() {
    return (
      <Col xs={12}>
        <Row>
          <Col xs={12}>
            <ToggleSub {...this.props} />
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <Button onClick={this.props.closeEditor}>close</Button>
          </Col>
        </Row>
      </Col>
    );
  }
}
