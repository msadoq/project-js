import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import ConnectedDatum from './ConnectedDatum';

import forView from '../../connectedData/forView';

// TODO : move at page level to de-duplicate

class ConnectedDataContainer extends Component {
  static propTypes = {
    viewId: PropTypes.string.isRequired,
    type: React.PropTypes.string.isRequired,
    timebarId: PropTypes.string.isRequired,
    interval: PropTypes.object.isRequired,
    connectedData: PropTypes.array.isRequired,
  };
  render() {
    return (
      <div>{_.map(this.props.connectedData, (cd, index) =>
        <ConnectedDatum
          key={`cd-${this.props.viewId}-${index}`}
          viewId={this.props.viewId}
          interval={this.props.interval}
          connectedDatum={cd}
        />
      )}</div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  const { viewId, timebarId } = ownProps;
  return {
    ...ownProps,
    connectedData: forView(state, timebarId, viewId),
  }
}

export default connect(mapStateToProps)(ConnectedDataContainer);
