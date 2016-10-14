import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

import TabsContainer from './TabsContainer';
import Debug from './Debug';
import Timebar from './Timebar';

const Navigation = props => (
  <Grid fluid>
    <Row>
      <Col xs={12}>
        <div style={{ textAlign: 'right' }}>
          <Debug />
          {' '}
          <Timebar />
        </div>
      </Col>
    </Row>
    <Row>
      <TabsContainer {...props} />
    </Row>
  </Grid>
);

export default Navigation;
