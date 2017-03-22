import React, { PropTypes } from 'react';
import _ from 'lodash/fp';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';

import selector from './MasterSessionSelector';

const MasterSession = ({ masterSession }) => (
  <Button bsSize="sm">
    Master session: {_.getOr('unknown', 'name', masterSession)}
  </Button>
);

MasterSession.propTypes = {
  masterSession: PropTypes.shape({
    name: PropTypes.string,
  }),
};
MasterSession.defaultProps = {
  masterSession: {},
};

export default connect(selector)(MasterSession);
