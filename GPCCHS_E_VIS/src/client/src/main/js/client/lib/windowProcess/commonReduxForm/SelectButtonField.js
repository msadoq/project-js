import React, { PropTypes } from 'react';
import SelectButton from './SelectButton';

export default class SelectButtonField extends React.Component {
  static propTypes = {
    input: PropTypes.shape({ value: PropTypes.string, onChange: PropTypes.func }).isRequired,
    buttons: PropTypes.arrayOf(PropTypes.object).isRequired,
    bsSize: PropTypes.string,
  }

  static defaultProps = {
    bsSize: 'xsmall',
  }

  render() {
    const {
      bsSize,
      buttons,
      input: { value, onChange },
    } = this.props;

    return (
      <SelectButton
        size={bsSize}
        active={value}
        buttons={buttons}
        onChange={onChange}
      />
    );
  }
}
