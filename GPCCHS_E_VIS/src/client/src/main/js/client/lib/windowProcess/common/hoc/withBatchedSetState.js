import React from 'react';
import _ from 'lodash/fp';
import { getWrappedInstance } from '../utils';

const DEFAULT_DELAY = 100;
const withBatchedSetState = ({ delay = DEFAULT_DELAY } = {}) =>
  WrappedComponent => class extends React.Component {
    componentDidMount() {
      this.wrappedInstance = this.getWrappedInstance();
      const instance = this.wrappedInstance;
      const throttledSetState = _.throttle(delay, (...args) => instance.setState(...args));
      instance.batchedState = instance.state;
      instance.setBatchedState = (updater) => {
        instance.batchedState = updater(instance.batchedState, instance.props);
        throttledSetState(instance.batchedState);
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
