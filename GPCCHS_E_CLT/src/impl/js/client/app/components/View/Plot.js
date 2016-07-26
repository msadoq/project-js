import React, { Component, PropTypes } from 'react';
import { Button } from 'react-bootstrap';
import _ from 'lodash';

export default class View extends Component {
  static propTypes = {
    viewId: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string,
    subscriptions: PropTypes.object,
    updateContent: PropTypes.func,
    openEditor: PropTypes.func,
  };
  constructor(...args) {
    super(...args);
    this.state = {
      newContent: 'new content to inject',
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    this.setState({ newContent: event.target.value });
  }
  render() {
    const points = _.map(this.props.subscriptions, s => _.map(s.points,
      p => <li key={`li${p.x}${p.y}`}>{`x:${p.x} - y:${p.y}`}</li>
    ));

    return (
      <div>
        Content: {this.props.content}
        <ul>
          {points}
        </ul>
        <div>
          <input
            type="text"
            value={this.state.newContent}
            onChange={this.handleChange}
          />
        </div>
        <div>
          <Button onClick={() => this.props.updateContent(this.state.newContent)}>
            Inject!
          </Button>
        </div>
        <div>
          <Button onClick={() => this.props.openEditor()}>
            Edit this view
          </Button>
        </div>
      </div>
    );
  }
}
