import React, { PropTypes } from 'react';
import Inspector from 'react-json-inspector';

const Information = ({ parameters, masterSession }) => (
  <div>
    <h3>Master Session</h3>
    <Inspector data={masterSession} />
    <h3>Configuration</h3>
    <Inspector data={parameters} />
  </div>
);

Information.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types, "DV6 TBC_CNES Unpredicatable object struct."
  parameters: PropTypes.object.isRequired,
  masterSession: PropTypes.shape({
    name: PropTypes.string,
  }),
};

Information.defaultProps = {
  masterSession: {},
};

export default Information;
