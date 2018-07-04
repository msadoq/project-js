import React from 'react';
import PropTypes from 'prop-types';
import HorizontalFormGroup from 'windowProcess/commonReduxForm/HorizontalFormGroup';

const InputParameters = ({ params }) => params.map(({ catalogName, itemName }, index) =>
  <HorizontalFormGroup label={`Variable ${index + 1}`}>
    <input className="form-control" value={`${catalogName}.${itemName}`} readOnly />
  </HorizontalFormGroup>
);


InputParameters.propTypes = {
  params: PropTypes.arrayOf(PropTypes.shape({
    catalogName: PropTypes.string.isRequired,
    itemName: PropTypes.string.isRequired,
  })),
};

InputParameters.defaultProps = {};

export default InputParameters;
