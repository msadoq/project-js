import React from 'react';
import { findDOMNode } from 'react-dom';
import _ from 'lodash/fp';

import { getWrappedInstance } from '../utils';

const WHEEL_DEFAULT_DELTA_Y = 120;

/*
  Higher order component that add for you onScrollUp and onScrollDown methods
  Usage : Please see viewManager/HistoryView component
*/

export default () => WrappedComponent => (
  class MouseWheelEventsHOC extends WrappedComponent {
    componentDidMount() {
      if (this.getWrappedInstance) {
        this.wrappedNode = findDOMNode(this.getWrappedInstance());
        this.wrappedNode.addEventListener('mousewheel', this.onWheel, false);
      }
    }

    componentWillUnmount() {
      this.wrappedNode.removeEventListener('mousewheel', this.onWheel, false);
    }

    scrollUp = () => (
      this.getWrappedInstance().onScrollUp && this.getWrappedInstance().onScrollUp()
    )

    scrollDown = () => (
      this.getWrappedInstance().onScrollUp && this.getWrappedInstance().onScrollDown()
    )

    onWheel = (e) => {
      e.preventDefault();
      const multipleScrollUp = _.times(() => this.scrollUp());
      const multipleScrollDown = _.times(() => this.scrollDown());
      const nbScroll = Math.abs(e.wheelDeltaY / WHEEL_DEFAULT_DELTA_Y);
      if (e.wheelDeltaY > 0) {
        multipleScrollUp(nbScroll);
      } else if (e.wheelDeltaY < 0) {
        multipleScrollDown(nbScroll);
      }
    }

    render() {
      return (
        <WrappedComponent
          ref={(i) => { this.getWrappedInstance = () => getWrappedInstance(i); }}
          {...this.props}
        />
      );
    }
  }
);
