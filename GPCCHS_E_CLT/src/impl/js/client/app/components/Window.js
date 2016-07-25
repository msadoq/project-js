import React, { Component, PropTypes } from 'react';
import { Grid, Row, Col, ButtonGroup, Button } from 'react-bootstrap';
import { Tabs, TabLink, TabContent } from 'react-tabs-redux';
import PageContainer from '../containers/PageContainer';

export default class Window extends Component {
  static propTypes = {
    windowId: PropTypes.any.isRequired,
    title: PropTypes.string,
    selectedTab: PropTypes.string,
    pages: PropTypes.array.isRequired,
    changePage: PropTypes.func.isRequired,
    addWindow: PropTypes.func.isRequired,
    delWindow: PropTypes.func.isRequired,
  };
  render() {
    const { windowId, pages, changePage } = this.props;

    let selectedTab = this.props.selectedTab;
    if (!selectedTab && pages.length > 0) {
      selectedTab = pages[0].pageId;
    }
    return (
      <Grid fluid>
        <Row>
          <Col xs={12}>
            <ButtonGroup>
              <Button
                onClick={() => this.props.addWindow('' + Math.random(), 'My new window')}>
                Open new window
              </Button>
              <Button
                onClick={() => this.props.delWindow(this.props.windowId)}>
                Close this window
              </Button>
            </ButtonGroup>
          </Col>
        </Row>
        <Tabs
          name={windowId}
          handleSelect={changePage}
          selectedTab={selectedTab}
        >
          <ul className="nav nav-tabs" style={{ 'marginTop': '15px' }}>
            {pages.map(page =>
              <li className={(selectedTab === page.pageId) ? 'active' : ''} key={`tab${page.pageId}`}>
                <a>
                  <TabLink to={`${page.pageId}`}>
                    {page.title}
                  </TabLink>
                </a>
              </li>
            )}
            <li key="tabNew">
              <a>New page +</a>
            </li>
          </ul>
          {pages.map(page =>
            <TabContent for={page.pageId} key={`tabContent${page.pageId}`}>
              <PageContainer windowId={windowId} pageId={page.pageId} />
            </TabContent>
          )}
        </Tabs>
      </Grid>
    );
  }
}
