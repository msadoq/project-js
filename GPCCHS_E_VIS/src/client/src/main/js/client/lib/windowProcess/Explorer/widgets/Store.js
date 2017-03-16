import React, { PropTypes } from 'react';
import Inspector from 'react-json-inspector';

const Store = ({ state }) => <Inspector data={state} />;

Store.propTypes = {
  state: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default Store;
