import React, { PureComponent, PropTypes } from 'react';
import {
  Button,
} from 'react-bootstrap';

export default class Explorer extends PureComponent {
  static propTypes = {
    toggleExplorer: PropTypes.func,
  }

  render() {
    return (
      <Button
        bsSize="sm"
        bsStyle="default"
        onClick={this.props.toggleExplorer}
      >
        Explorer
      </Button>
    );
  }
}
