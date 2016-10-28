import React, { Component, PropTypes } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

import Debug from './Debug';

export default class Navigation extends Component {
  static propTypes = {
    windowId: PropTypes.string,
    focusedPageId: PropTypes.string,
  };
  render() {
    return (
      <Grid fluid>
        <Row>
          <Col xs={12}>
            <div style={{ textAlign: 'right' }}>
              <Debug
                windowId={this.props.windowId}
                focusedPageId={this.props.focusedPageId}
              />
            </div>
          </Col>
        </Row>
      </Grid>
    );
  }
}
