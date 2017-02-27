import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import _get from 'lodash/get';
import { getMasterSession } from '../../store/selectors/masterSession';

const MasterSession = ({ masterSession }) => (
  <Button bsSize="sm">
    Master session: {_get(masterSession, ['name'], 'unknown')}
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

export default connect(
  state => ({ masterSession: getMasterSession(state) })
)(MasterSession);
