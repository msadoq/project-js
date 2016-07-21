import React, { Component, PropTypes } from 'react';
import { Col, Button } from 'react-bootstrap';

export default class View extends Component {
  static propTypes = {
    viewId: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string,
    updateContent: PropTypes.func,
  };
  constructor({...args}) {
    super({...args});
    this.state = {
      newContent: 'new content to inject',
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    this.setState({ newContent: event.target.value });
  }
  render() {
    return (
      <Col xs={12} style={{ border: '1px solid grey', margin: '5px' }}>
        <h1>View {this.props.title}</h1>
        Content: {this.props.content}
        <div>
          <input
            type="text"
            value={this.state.newContent}
            onChange={this.handleChange}
          />
          <Button onClick={() => this.props.updateContent(this.state.newContent)}>
            Inject!
          </Button>
        </div>
      </Col>
    );
  }
}
