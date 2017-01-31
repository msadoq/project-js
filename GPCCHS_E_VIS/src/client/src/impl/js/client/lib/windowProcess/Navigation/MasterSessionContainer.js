import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { getMasterSession } from '../../store/selectors/masterSession';

const MasterSession = ({ masterSession }) => (
  <Button bsSize="sm">Master session: {masterSession.name}</Button>
);

MasterSession.propTypes = {
  masterSession: PropTypes.shape({
    name: PropTypes.string,
  }),
};

export default connect(
  state => ({ masterSession: getMasterSession(state) })
)(MasterSession);
