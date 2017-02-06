import { Component, PropTypes } from 'react';
import {
  HSC_RENDERER_WARNING_STEP,
  HSC_RENDERER_CRITICAL_STEP,
  HSS_STATUS_HEALTHY,
  HSS_STATUS_WARNING,
  HSS_STATUS_ERROR,
} from 'common/constants';
import { main } from '../ipc';

const INTERVAL = 500;

export default class HealthMonitor extends Component {
  static propTypes = {
    windowId: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
  };

  componentDidMount() {
    this.currentStatus = HSS_STATUS_HEALTHY;
    this.lastTickTime = Date.now();

    this.timeout = this.checkHighCPULoad();
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  checkHighCPULoad = () => {
    const { windowId } = this.props;

    const elapsed = Date.now() - this.lastTickTime;
    const delay = elapsed - INTERVAL;

    if (delay >= HSC_RENDERER_CRITICAL_STEP && this.currentStatus !== HSS_STATUS_ERROR) {
      this.currentStatus = HSS_STATUS_ERROR;
      main.sendHealthStatus(windowId, HSS_STATUS_ERROR);
    } else if (delay >= HSC_RENDERER_WARNING_STEP && this.currentStatus !== HSS_STATUS_WARNING) {
      this.currentStatus = HSS_STATUS_WARNING;
      main.sendHealthStatus(windowId, HSS_STATUS_WARNING);
    } else if (this.currentStatus !== HSS_STATUS_HEALTHY) {
      this.currentStatus = HSS_STATUS_HEALTHY;
      main.sendHealthStatus(windowId, HSS_STATUS_HEALTHY);
    }

    this.lastTickTime = Date.now();
    this.timeout = setTimeout(() => this.checkHighCPULoad(), INTERVAL);
  }

  render() {
    return this.props.children;
  }
}
