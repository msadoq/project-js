// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #3622 : 14/02/2017 : Explorer Right panel refactoring .
// END-HISTORY
// ====================================================================

import React, { PropTypes } from 'react';
import { Button } from 'react-bootstrap';

export default class ToggleButton extends React.Component {
  static propTypes = {
    on: PropTypes.string.isRequired,
    off: PropTypes.string.isRequired,
    default: PropTypes.oneOf(['ON', 'OFF']).isRequired,
    styleOn: PropTypes.string.isRequired,
    styleOff: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    size: PropTypes.string,
    className: PropTypes.string,
  }
  static defaultProps = {
    size: '',
    className: '',
  }

  componentWillMount() {
    this.setState({
      onoff: this.props.default,
      onoffLabel: this.props.default,
    });
  }

  handleToggle = () => {
    const newVal = this.state.onoff === 'ON' ? 'OFF' : 'ON';
    this.setState({
      onoff: newVal,
    });
    this.props.onChange(newVal);
  }

  render() {
    return (
      <Button
        bsSize={this.props.size}
        bsStyle={(this.state.onoff === 'ON') ? this.props.styleOn : this.props.styleOff}
        onClick={this.handleToggle}
        className={this.props.className}
      >
        {(this.state.onoff === 'ON') ? this.props.on : this.props.off}
      </Button>
    );
  }
}
