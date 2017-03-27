import React, { PropTypes } from 'react';
import Inspector from 'react-json-inspector';

const Information = ({ configuration, masterSession }) => (
  <div>
    <h3>Master Session</h3>
    <Inspector data={masterSession} />
    <h3>Configuration</h3>
    <Inspector data={configuration} />
  </div>
);

Information.propTypes = {
  configuration: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  masterSession: PropTypes.shape({
    name: PropTypes.string,
  }),
};

Information.defaultProps = {
  masterSession: {},
};

export default Information;
