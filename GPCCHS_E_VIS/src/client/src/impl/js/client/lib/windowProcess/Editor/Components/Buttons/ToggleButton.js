import React from 'react';
import { Button } from 'react-bootstrap';
import styles from './ToggleButton.css';

export default class ToggleButton extends React.Component {
  static propTypes = {
    on: React.PropTypes.string,
    off: React.PropTypes.string,
    default: React.PropTypes.oneOf(['ON', 'OFF']),
    size: React.PropTypes.string,
    styleOn: React.PropTypes.string,
    styleOff: React.PropTypes.string,
    onChange: React.PropTypes.func.isRequired
  }
  constructor(props) {
    super(props);
    this.state = {
      onoff: this.props.default,
      size: this.props.size,
      onoffLabel: this.props.default
    };
    this.toogleMe = this.toogleMe.bind(this);
  }
  toogleMe() {
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
        onClick={this.toogleMe}
        className={this.state.size === 'xsmall' ? styles.xsmall : null}
      >
        {(this.state.onoff === 'ON') ? this.props.on : this.props.off}
      </Button>
    );
  }
}
