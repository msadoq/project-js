import React, { PropTypes } from 'react';
import _ from 'lodash/fp';
import withMouseWheelEvents from '../hoc/withMouseWheelEvents';
import withBatchedSetState from '../hoc/withBatchedSetState';

const initialState = {
  position: 0,
};

const withScroll = _.compose(
  withBatchedSetState({ delay: 60 }), // throttled every 60ms
  withMouseWheelEvents(),
  WrappedComponent => (
    class ScrollableView extends React.Component {
      static propTypes = {
        rows: PropTypes.arrayOf(PropTypes.shape({
          data: PropTypes.any,
          type: PropTypes.string,
        })).isRequired,
        containerHeight: PropTypes.number.isRequired,
        rowHeight: PropTypes.number.isRequired,
        onScrollUp: PropTypes.func,
        onScrollDown: PropTypes.func,
      }

      static defaultProps = {
        onScrollUp: _.noop,
        onScrollDown: _.noop,
      }

      state = initialState

      componentWillMount() {
        this.getWrappedInstance = () => this;
      }

      componentWillReceiveProps(nextProps) {
        if (this.state.position >= this.getLastPosition(nextProps)) {
          this.setState(_.set('position', this.getLastPosition(nextProps)));
        }
      }

      onScrollUp = () => {
        if (this.state.position > 0) {
          this.props.onScrollUp();
          this.setState(_.update('position', _.add(-1)));
        }
      }

      onScrollDown = () => {
        if (this.state.position < this.getLastPosition()) {
          this.props.onScrollDown();
          this.setState(_.update('position', _.add(1)));
        }
      }

      getScrollAreaHeight = () => this.props.containerHeight - (this.props.rowHeight * 2)

      getNbDisplayedElems = (props = this.props) => {
        const n = props.enableSearch ? 2 : 1;
        return Math.floor(props.containerHeight / props.rowHeight) - n;
      }

      getLastPosition = (props = this.props) => (
        Math.max(0, (this.props.rows.length - this.getNbDisplayedElems(props)) + 1)
      )

      getScrollBarPosition = () => (
        Math.ceil((this.state.position / this.getLastPosition()) * this.getScrollAreaHeight())
      )

      resetState = () => {
        this.setState(_.always(initialState));
      }

      render() {
        return (
          <WrappedComponent
            {...this.props}
            position={this.state.position}
          />
        );
      }
    }
  )
);

export default withScroll;
