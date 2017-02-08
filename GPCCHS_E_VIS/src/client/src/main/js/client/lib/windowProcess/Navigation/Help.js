import React, { PropTypes } from 'react';
import {
  Button,
} from 'react-bootstrap';

const Help = ({ toggleHelp }) => (
  <Button
    bsSize="sm"
    bsStyle="default"
    onClick={toggleHelp}
  >
    Help
  </Button>
);
Help.propTypes = {
  toggleHelp: PropTypes.func.isRequired,
};

export default Help;
