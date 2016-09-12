import React, { Component, PropTypes } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import Navigation from '../Navigation/Navigation';
import PageContainer from '../Page/PageContainer';

export default class Window extends Component {
  static contextTypes = {
    windowId: PropTypes.string,
  };
  render() {
    return (
      <Grid fluid>
        <Row>
          <Col xs={12} className="mt10 mb10">
            <Navigation />
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <PageContainer windowId={this.context.windowId} />
          </Col>
        </Row>
      </Grid>
    );
  }
}
