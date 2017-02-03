import React, { PropTypes } from 'react';
import { Button } from 'react-bootstrap';

export default class ButtonToggleField extends React.Component {
  static propTypes = {
    input: PropTypes.object.isRequired,
    bsSize: PropTypes.string,
    styleOn: PropTypes.string,
    styleOff: PropTypes.string,
    textOn: PropTypes.string,
    textOff: PropTypes.string,
  }

  static defaultProps = {
    bsSize: 'xsmall',
    styleOn: 'primary',
    styleOff: 'default',
    textOn: 'ON',
    textOff: 'OFF',
  }

  handleToggle = () => {
    this.props.input.onChange(!this.props.input.value);
  }

  render() {
    const {
      bsSize,
      styleOn,
      styleOff,
      textOn,
      textOff,
      input: { value },
    } = this.props;
    const bsStyle = value ? styleOn : styleOff;
    const text = value ? textOn : textOff;

    return (
      <Button
        bsSize={bsSize}
        bsStyle={bsStyle}
        onClick={this.handleToggle}
      >
        {text}
      </Button>
    );
  }
}
