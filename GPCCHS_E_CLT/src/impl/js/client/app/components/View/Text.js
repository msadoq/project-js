import React, { PropTypes } from 'react';

const Unknown = props => <div>Text view #{props.viewId} content: {props.content}</div>;

Unknown.propTypes = {
  type: React.PropTypes.string,
  viewId: PropTypes.string.isRequired,
  content: PropTypes.string,
};

export default Unknown;
