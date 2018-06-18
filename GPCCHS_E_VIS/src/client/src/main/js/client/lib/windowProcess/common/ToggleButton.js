// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #3622 : 14/02/2017 : Explorer Right panel refactoring .
// END-HISTORY
// ====================================================================

import React from 'react';
import PropTypes from 'prop-types';
import { Button, Glyphicon } from 'react-bootstrap';

export const ON = 'ON';
export const OFF = 'OFF';

export default class ToggleButton extends React.Component {
  static propTypes = {
    on: PropTypes.string.isRequired,
    off: PropTypes.string.isRequired,
    default: PropTypes.oneOf([ON, OFF]).isRequired,
    styleOn: PropTypes.string,
    styleOff: PropTypes.string,
    iconOn: PropTypes.string,
    iconOff: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    size: PropTypes.string,
    className: PropTypes.string,
  };
  static defaultProps = {
    size: 'sm',
    className: '',
    styleOn: undefined,
    styleOff: undefined,
  };

  componentWillMount() {
    this.setState({
      onoff: this.props.default,
      onoffLabel: this.props.default,
    });
  }

  handleToggle = () => {
    const newVal = this.state.onoff === ON ? OFF : ON;
    this.setState({
      onoff: newVal,
    });
    this.props.onChange(newVal);
  }

  render() {
    const { size, styleOn, styleOff, className, on, off, iconOn, iconOff } = this.props;
    return (
      <Button
        bsSize={size}
        bsStyle={(this.state.onoff === ON) ? styleOn : styleOff}
        onClick={this.handleToggle}
        className={className}
      >
        {(this.state.onoff === ON)
          ? iconOn && <Glyphicon glyph={iconOn} />
          : iconOff && <Glyphicon glyph={iconOff} />
        }
        {(this.state.onoff === ON) ? on : off}
      </Button>
    );
  }
}
