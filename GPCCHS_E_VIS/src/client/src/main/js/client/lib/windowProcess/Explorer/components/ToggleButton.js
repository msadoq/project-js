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
        bsSize="xsmall"
        bsStyle={(this.state.onoff === 'ON') ? this.props.styleOn : this.props.styleOff}
        onClick={this.handleToggle}
      >
        {(this.state.onoff === 'ON') ? this.props.on : this.props.off}
      </Button>
    );
  }
}
