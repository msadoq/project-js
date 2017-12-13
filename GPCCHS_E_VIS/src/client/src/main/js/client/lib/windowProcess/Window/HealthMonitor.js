// ====================================================================
// HISTORY
// VERSION : 1.1.0 : : : 28/02/2017 : Initial version
// VERSION : 1.1.2 : DM : #5828 : 21/03/2017 : Add loading message before renderer
// VERSION : 1.1.2 : DM : #5828 : 24/03/2017 : Loading for code editor .
// VERSION : 1.1.2 : DM : #5828 : 13/06/2017 : Move common/constants/ in client/ folder
// VERSION : 1.1.2 : DM : #6700 : 16/06/2017 : Add store enhancers helpers code coverage and merge with dev
// VERSION : 1.1.2 : DM : #6700 : 26/06/2017 : Change windowProcess health management to dispatch a Redux action directly.
// VERSION : 1.1.2 : DM : #6700 : 06/07/2017 : Add health mechanism on each process
// VERSION : 1.1.2 : DM : #6700 : 06/07/2017 : Modify health monitoring mechanism : - Handle properly start and stop - Add critical delay value in conf - Only start monitoring on DEBUG
// VERSION : 1.1.2 : DM : #6700 : 06/07/2017 : Remove health management obsolete code
// END-HISTORY
// ====================================================================

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
