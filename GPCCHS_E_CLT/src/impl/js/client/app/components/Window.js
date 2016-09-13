import React, { Component, PropTypes } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import Navigation from './Window/Navigation';
import PagesNavigation from './Window/PagesNavigation';
import PageContainer from '../containers/PageContainer';

export default class Window extends Component {
  static propTypes = {
    focusedTab: PropTypes.string,
    pages: PropTypes.array.isRequired,
  };
  render() {
    const { pages } = this.props;

    // test for page existence in store (old ref in window)
    const pageExists = pageId => !!pages.find(p => p.pageId === pageId);

    let focusedTab = this.props.focusedTab;
    if ((!focusedTab || !pageExists(focusedTab)) && pages.length > 0) {
      focusedTab = pages[0].pageId;
    }

    const page = pageExists(focusedTab)
      ? <PageContainer pageId={focusedTab} />
      : null;

    return (
      <Grid fluid>
        <Row>
          <Col xs={12} className="mt10 mb10">
            <Navigation {...this.props} />
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <PagesNavigation focusedTab={focusedTab} {...this.props} />
            {page}
          </Col>
        </Row>
      </Grid>
    );
  }
}
