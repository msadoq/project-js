import React from 'react';
import { Field } from 'redux-form';
import PropTypes from 'prop-types';
import HorizontalFormGroup from 'windowProcess/commonReduxForm/HorizontalFormGroup';

const Input = ({ input, index, catalogName, itemName }) => (
  <HorizontalFormGroup label={`Variable ${index + 1}`}>
    <input
      type="text"
      className="form-control"
      {...input}
      readOnly
      value={`${catalogName}.${itemName}`}
    />
  </HorizontalFormGroup>
);

const InputParameters = ({ params }) => (
  params ? params.map(({ catalogName, itemName }, index) =>
    <Field
      key={catalogName + itemName}
      name={index}
      component={Input}
      index={index}
      catalogName={catalogName}
      itemName={itemName}
    />
  )
  : ''
);


InputParameters.propTypes = {
  params: PropTypes.arrayOf(PropTypes.shape(Input.propTypes)),
};

InputParameters.defaultProps = {};

export default InputParameters;
