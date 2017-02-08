import React, { PropTypes } from 'react';
import { Button } from 'react-bootstrap';

const Explorer = ({ toggleExplorer }) => (
  <Button
    bsSize="sm"
    bsStyle="default"
    onClick={toggleExplorer}
  >
    Explorer
  </Button>
);
Explorer.propTypes = {
  toggleExplorer: PropTypes.func.isRequired,
};

export default Explorer;
