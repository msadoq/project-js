
import React, { PropTypes } from 'react';

const Unknown = props => <div>View #{props.viewId}: unknown type ('{props.type}')</div>;

Unknown.propTypes = {
  type: React.PropTypes.string,
  viewId: PropTypes.string.isRequired,
};

export default Unknown;
