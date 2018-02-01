// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #3622 : 09/03/2017 : Moving the editor files in viewManager, splitting between commonEditor and commonReduxForm.
// END-HISTORY
// ====================================================================

import React, { PropTypes } from 'react';
import { Button } from 'react-bootstrap';

export default class ButtonToggleField extends React.Component {
  static propTypes = {
    input: PropTypes.shape({ value: PropTypes.boolean, onChange: PropTypes.func }).isRequired,
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
