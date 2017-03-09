import React, { PropTypes } from 'react';
import { ColorPicker } from './';
import { colors as initialColors } from '../common/colors';

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
  colors: PropTypes.arrayOf(PropTypes.string),
};
ColorPickerField.defaultProps = {
  colors: initialColors,
};

export default ColorPickerField;
