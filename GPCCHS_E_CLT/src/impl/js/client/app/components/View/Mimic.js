import React, { Component, PropTypes } from 'react';
import { Col } from 'react-bootstrap';

export default class Mimic extends Component {
  static propTypes = {
    viewId: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string,
    updateContent: PropTypes.func,
  };
  constructor({...args}) {
    super({...args});
    this.state = {
      purpleRy: 30,
      limeRy: 20,
      yellowRy: 15,
      purpleRx: 220,
      limeRx: 190,
      yellowRx: 170,
    };
    this.interval = null; // ugly! just for testing :)
  }
  componentDidMount() {
    this.interval = setInterval(this.animate.bind(this), 100);
  }
  componentWillUnmount() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }
  animate() {
    this.setState({
      purpleRy: this.growth(this.state.purpleRy, 10, 30),
      limeRy: this.growth(this.state.limeRy, 10, 30),
      yellowRy: this.growth(this.state.yellowRy, 10, 30),
      purpleRx: this.growth(this.state.purpleRx, 170, 220),
      limeRx: this.growth(this.state.limeRx, 170, 220),
      yellowRx: this.growth(this.state.yellowRx, 170, 220),
    });
  }
  growth(current, min, max) {
    return (current > min)
      ? current - 1
      : max;
  }
  render() {
    return (
      <Col xs={12} style={{ border: '1px solid grey', margin: '5px' }}>
        <h1>View {this.props.title}</h1>
        <div>
          <svg height="150" width="500">
            <ellipse cx="240" cy="100" rx={this.state.purpleRx} ry={this.state.purpleRy} fill="purple" />
            <ellipse cx="220" cy="70" rx={this.state.limeRx} ry={this.state.limeRy} fill="lime" />
            <ellipse cx="210" cy="45" rx={this.state.yellowRx} ry={this.state.yellowRy} fill="yellow" />
          </svg>
        </div>
      </Col>
    );
  }
}
