import React from 'react';
import { Button } from 'react-bootstrap';

export default class ToggleButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      onoff: this.props.default
    };
    this.toogleMe = this.toogleMe.bind(this);
  }
  toogleMe() {
    this.setState({
      onoff: this.state.onoff === this.props.on ? this.props.off : this.props.on
    });
  }
  render() {
    return (
      <Button
        bsSize="xsmall"
        bsStyle={(this.state.onoff === this.props.on) ? 'primary' : 'warning'}
        onClick={this.toogleMe}
      >
        {this.state.onoff}
      </Button>
    );
  }
}
