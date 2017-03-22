import { Component, PropTypes } from 'react';
import {
  HSC_RENDERER_WARNING_STEP,
  HSC_RENDERER_CRITICAL_STEP,
  HEALTH_STATUS_HEALTHY,
  HEALTH_STATUS_WARNING,
  HEALTH_STATUS_CRITICAL,
} from 'common/constants';
import { main } from '../ipc';

const INTERVAL = 500;

export default class HealthMonitor extends Component {
  static propTypes = {
    windowId: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
  };

  componentDidMount() {
    this.currentStatus = HEALTH_STATUS_HEALTHY;
    this.lastTickTime = Date.now();

    this.timeout = this.checkHighCPULoad();
    document.body.removeChild(document.getElementById('waitingRenderer'));
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  checkHighCPULoad = () => {
    const { windowId } = this.props;

    const elapsed = Date.now() - this.lastTickTime;
    const delay = elapsed - INTERVAL;

    if (delay >= HSC_RENDERER_CRITICAL_STEP && this.currentStatus !== HEALTH_STATUS_CRITICAL) {
      this.currentStatus = HEALTH_STATUS_CRITICAL;
      main.sendHealthStatus(windowId, HEALTH_STATUS_CRITICAL);
    } else if (delay >= HSC_RENDERER_WARNING_STEP && this.currentStatus !== HEALTH_STATUS_WARNING) {
      this.currentStatus = HEALTH_STATUS_WARNING;
      main.sendHealthStatus(windowId, HEALTH_STATUS_WARNING);
    } else if (this.currentStatus !== HEALTH_STATUS_HEALTHY) {
      this.currentStatus = HEALTH_STATUS_HEALTHY;
      main.sendHealthStatus(windowId, HEALTH_STATUS_HEALTHY);
    }

    this.lastTickTime = Date.now();
    this.timeout = setTimeout(() => this.checkHighCPULoad(), INTERVAL);
  }

  render() {
    return this.props.children;
  }
}
