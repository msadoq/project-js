import React from 'react';
import _ from 'lodash/fp';
import { getWrappedInstance } from '../utils';

const DEFAULT_DELAY = 100;
const withBatchedSetState = ({ delay = DEFAULT_DELAY } = {}) =>
  WrappedComponent => class extends React.Component {
    componentDidMount() {
      this.wrappedInstance = this.getWrappedInstance();
      const instance = this.wrappedInstance;
      const throttledUpdate = _.throttle(delay, () => instance.forceUpdate());
      instance.setState = (updater) => {
        instance.state = updater(instance.state, instance.props);
        throttledUpdate();
      };
    }

    render() {
      return (
        <WrappedComponent
          ref={(i) => { this.getWrappedInstance = () => getWrappedInstance(i); }}
          {...this.props}
        />
      );
    }
};

export default withBatchedSetState;
