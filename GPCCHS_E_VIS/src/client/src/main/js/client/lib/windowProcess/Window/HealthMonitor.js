import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {
  HSC_RENDERER_WARNING_STEP,
  HSC_RENDERER_CRITICAL_STEP,
  HEALTH_STATUS_HEALTHY,
  HEALTH_STATUS_WARNING,
  HEALTH_STATUS_CRITICAL,
} from '../../constants';
import { updateWindowStatus } from '../../store/actions/health';

const INTERVAL = 500;

class HealthMonitor extends Component {
  static propTypes = {
    windowId: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    updateWindowStatus: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.currentStatus = HEALTH_STATUS_HEALTHY;
    this.lastTickTime = Date.now();

    this.timeout = this.checkHighCPULoad();
    document.getElementById('waitingRenderer').style.display = 'none';
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  checkHighCPULoad = () => {
    const { windowId, updateWindowStatus: update } = this.props;

    const elapsed = Date.now() - this.lastTickTime;
    const delay = elapsed - INTERVAL;

    if (delay >= HSC_RENDERER_CRITICAL_STEP && this.currentStatus !== HEALTH_STATUS_CRITICAL) {
      this.currentStatus = HEALTH_STATUS_CRITICAL;
      update(windowId, HEALTH_STATUS_CRITICAL);
    } else if (delay >= HSC_RENDERER_WARNING_STEP && this.currentStatus !== HEALTH_STATUS_WARNING) {
      this.currentStatus = HEALTH_STATUS_WARNING;
      update(windowId, HEALTH_STATUS_WARNING);
    } else if (this.currentStatus !== HEALTH_STATUS_HEALTHY) {
      this.currentStatus = HEALTH_STATUS_HEALTHY;
      update(windowId, HEALTH_STATUS_HEALTHY);
    }

    this.lastTickTime = Date.now();
    this.timeout = setTimeout(() => this.checkHighCPULoad(), INTERVAL);
  }

  render() {
    return this.props.children;
  }
}

export default connect(null, { updateWindowStatus })(HealthMonitor);
