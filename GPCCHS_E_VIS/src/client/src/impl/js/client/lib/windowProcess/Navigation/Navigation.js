import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

import TabsContainer from './TabsContainer';
import Debug from './Debug';
import Timebar from './Timebar';
import DataMap from './DataMap';

const Navigation = props => (
  <Grid fluid>
    <Row>
      <Col xs={12}>
        <div style={{ textAlign: 'right' }}>
          <Debug />
          {' '}
          <DataMap />
          {' '}
          <Timebar {...props} />
        </div>
      </Col>
    </Row>
    <Row>
      <TabsContainer {...props} />
    </Row>
  </Grid>
);

export default Navigation;
