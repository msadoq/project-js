import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import Navigation from '../Navigation/Navigation';
import PageContainer from '../Page/PageContainer';

export default class Window extends Component {
  render() {
    return (
      <Grid fluid>
        <Row>
          <Col xs={12} className="mt10 mb10">
            <Navigation {...this.props} />
          </Col>
        </Row>
        <Row>
          <PageContainer {...this.props} />
        </Row>
      </Grid>
    );
  }
}
