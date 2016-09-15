import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { getWindowConnectedData } from '../../store/mutations/windowReducer';
import ConnectedData from './ConnectedData';

class ConnectedDataContainer extends Component {
  static propTypes = {
    windowId: PropTypes.string.isRequired,
    connectedData: PropTypes.array.isRequired,
  };
  render() {
    return (
      <div>
        {_.map(
          this.props.connectedData, cd => <ConnectedData
            key={cd.connectedDataId}
            formula={cd.formula}
            domain={cd.domain}
            timeline={cd.timeline}
            filter={cd['filter']}
          />
        )}
      </div>
    );
  }
}

export default connect((state, { windowId }) => ({
  windowId,
  connectedData: getWindowConnectedData(state, windowId),
}))(ConnectedDataContainer);
