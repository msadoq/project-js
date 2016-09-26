import React, { Component, PropTypes } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import WebsocketContainer from './WebsocketContainer';
import TabsContainer from './TabsContainer';
import Debug from './Debug';

export default class Navigation extends Component {
  static propTypes = {
    windowId: PropTypes.string.isRequired,
    pageId: PropTypes.string.isRequired,
  };
  render() {
    return (
      <Grid fluid>
        <Row>
          <Col xs={10}>
            <WebsocketContainer />
          </Col>
          <Col xs={2}>
            <Debug />
          </Col>
        </Row>
        <Row>
          <TabsContainer
            windowId={this.props.windowId}
            pageId={this.props.pageId}
          />
        </Row>
      </Grid>
    );
  }
}
