import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import formula from '../../utils/formula';
import { getWindowSubscriptions } from '../../store/mutations/windowReducer';
import Subscriptions from './Subscriptions';

class SubscriptionsContainer extends Component {
  static propTypes = {
    windowId: PropTypes.string.isRequired,
    subscriptions: PropTypes.array.isRequired,
  };
  render() {
    return (
      <div>
        {_.map(this.props.subscriptions, cd => {
          const parameter = formula(cd.formula);
          return (
            <Subscriptions
              key={cd.connectedDataId}
              windowId={this.props.windowId}
              connectedDataId={cd.connectedDataId}
              parameterName={parameter.parameterName}
              catalog={parameter.catalog}
              comObject={parameter.comObject}
              domainId={123}//cd.domainId} // TODO dbrugne
              sessionId={345}//{cd.sessionId} // TODO dbrugne
            />
          );
        })}
      </div>
    );
  }
}

export default connect((state, { windowId }) => ({
  windowId,
  subscriptions: getWindowSubscriptions(state, windowId),
}))(SubscriptionsContainer);
