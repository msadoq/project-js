import React from 'react';
import PropTypes from 'prop-types';

const Code = ({ className, children, visible }) => (visible
  ? (
    <fieldset className={className}>
      <legend>code</legend>
      {children}
    </fieldset>
  ) : null
);

Code.propTypes = {
  className: PropTypes.string,
  children: PropTypes.arrayOf(PropTypes.node),
  visible: PropTypes.bool,
};

Code.defaultProps = {};

export default Code;
