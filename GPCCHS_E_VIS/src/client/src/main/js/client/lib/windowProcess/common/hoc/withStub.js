import React from 'react';
import createInterval from '../../../common/utils/interval';
import { getWrappedInstance } from '../utils';

const identity = x => x;

// tool for developments
export default ({
  frequency = 1000,
  updater = identity,
  initialState = {},
} = {}) => WrappedComponent => (
  class extends React.Component {
    state = initialState

    componentDidMount() {
      this.interval = createInterval(frequency, () => this.tick());
    }

    componentWillUnmount() {
      this.interval.destroy();
    }

    tick() {
      this.setState(updater);
    }

    render() {
      return (
        <WrappedComponent
          ref={(i) => { this.getWrappedInstance = () => getWrappedInstance(i); }}
          {...this.props}
          {...this.state}
        />
      );
    }
  }
);
