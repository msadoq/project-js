import React, { PropTypes } from 'react';
import { Button } from 'react-bootstrap';
import styles from './ToggleButton.css';

export default class ToggleButton extends React.Component {
  static propTypes = {
    on: PropTypes.string,
    off: PropTypes.string,
    default: PropTypes.oneOf(['ON', 'OFF']),
    size: PropTypes.string,
    styleOn: PropTypes.string,
    styleOff: PropTypes.string,
    onChange: PropTypes.func.isRequired
  }

  componentWillMount() {
    this.setState({
      onoff: this.props.default,
      size: this.props.size,
      onoffLabel: this.props.default
    });
  }

  handleToggle = () => {
    const newVal = this.state.onoff === 'ON' ? 'OFF' : 'ON';
    this.setState({
      onoff: newVal
    });
    this.props.onChange(newVal);
  }

  render() {
    return (
      <Button
        bsSize="xsmall"
        bsStyle={(this.state.onoff === 'ON') ? this.props.styleOn : this.props.styleOff}
        onClick={this.handleToggle}
        className={this.state.size === 'xsmall' ? styles.xsmall : null}
      >
        {(this.state.onoff === 'ON') ? this.props.on : this.props.off}
      </Button>
    );
  }
}
