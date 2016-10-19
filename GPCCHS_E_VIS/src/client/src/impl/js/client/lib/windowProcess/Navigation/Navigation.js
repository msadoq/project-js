import React, { PropTypes } from 'react';
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
          <Debug {...props} />
          {' '}
          <DataMap />
          {' '}
          {props.focusedPage && props.focusedPage.timebarId ? <Timebar {...props} /> : null}
        </div>
      </Col>
    </Row>
    <Row>
      <TabsContainer {...props} />
    </Row>
  </Grid>
);

Navigation.propTypes = {
  focusedPage: PropTypes.object,
};

export default Navigation;
