import { Component, PropTypes } from 'react';
import { noop } from 'lodash';

class HealthMonitor extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    startMonitoring: PropTypes.func,
    stopMonitoring: PropTypes.func,
  };

  static defaultProps = {
    startMonitoring: noop,
    stopMonitoring: noop,
  }

  componentDidMount() {
    this.props.startMonitoring();
  }
  componentWillUnmount() {
    this.props.stopMonitoring();
  }

  render() {
    return this.props.children;
  }
}

export default HealthMonitor;
