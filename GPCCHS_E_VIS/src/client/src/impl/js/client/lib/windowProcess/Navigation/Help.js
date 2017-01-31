import React, { PureComponent, PropTypes } from 'react';
import {
  Button,
} from 'react-bootstrap';

export default class Help extends PureComponent {
  static propTypes = {
    toggleHelp: PropTypes.func,
  }

  render() {
    return (
      <Button
        bsSize="sm"
        bsStyle="default"
        onClick={this.props.toggleHelp}
      >
        Help
      </Button>
    );
  }
}
