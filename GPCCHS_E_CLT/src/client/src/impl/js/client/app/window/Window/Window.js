import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import Navigation from '../Navigation/Navigation';
import ConnectedDataContainer from '../ConnectedData/ConnectedDataContainer';
import PageContainer from '../Page/PageContainer';

export default class Window extends Component {
  render() {
    return (
      <Grid fluid>
        <ConnectedDataContainer
          windowId={this.props.windowId}
        />
        <Row>
          <Col xs={12} className="mt10 mb10">
            <Navigation
              windowId={this.props.windowId}
              pageId={this.props.pageId}
            />
          </Col>
        </Row>
        <Row>
          <PageContainer
            windowId={this.props.windowId}
            pageId={this.props.pageId}
          />
        </Row>
      </Grid>
    );
  }
}
