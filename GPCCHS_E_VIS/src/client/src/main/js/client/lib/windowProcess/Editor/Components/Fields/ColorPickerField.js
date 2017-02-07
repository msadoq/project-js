import React, { PropTypes } from 'react';
import ColorPicker from '../ColorPicker';

const ColorPickerField = (props) => {
  const {
    input: { value, onChange },
    colors,
  } = props;

  return (
    <ColorPicker
      color={value}
      colors={colors}
      onChange={onChange}
      width={195}
    />
  );
};

ColorPickerField.propTypes = {
  input: PropTypes.shape({
    value: PropTypes.string,
    onChange: PropTypes.func,
  }).isRequired,
  colors: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ColorPickerField;
