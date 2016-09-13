import React, { Component, PropTypes } from 'react';
import { ButtonGroup, Button } from 'react-bootstrap';
import WebsocketContainer from '../../containers/WebsocketContainer';

export default class Window extends Component {
  static propTypes = {
    windowId: PropTypes.any.isRequired,
    addWindow: PropTypes.func.isRequired,
    delWindow: PropTypes.func.isRequired,
  };
  render() {
    return (
      <div>
        <ButtonGroup>
          <Button
            onClick={() => this.props.addWindow(`${Math.random()}`, 'My new window')}
          >
            Open new window
          </Button>
          <Button
            onClick={() => this.props.delWindow(this.props.windowId)}
          >
            Close this window
          </Button>
          <WebsocketContainer />
        </ButtonGroup>

      </div>
    );
  }
}
