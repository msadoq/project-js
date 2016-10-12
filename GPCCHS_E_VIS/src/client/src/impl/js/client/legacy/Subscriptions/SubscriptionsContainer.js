import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import Subscription from './Subscription';

import forWindow from '../../connectedData/forWindow';

class SubscriptionsContainer extends Component {
  static propTypes = {
    windowId: PropTypes.string.isRequired,
    subscriptions: PropTypes.array.isRequired,
  };
  render() {
    return (
      <div>{_.map(this.props.subscriptions, (cd, index) =>
        <Subscription
          key={`cd-${index}`}
          windowId={this.props.windowId}
          cd={cd}
        />
      )}</div>
    );
  }
}

function mapStateToProps(state, { windowId }) {
  return {
    windowId,
    subscriptions: forWindow(state, windowId),
  };
}

export default connect(mapStateToProps)(SubscriptionsContainer);
