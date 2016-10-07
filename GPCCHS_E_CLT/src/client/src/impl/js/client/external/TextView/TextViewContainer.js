import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';

import TextView from './TextView';
import textView from './main';

const TextViewContainer = props => <TextView {...props} />;

function mapStateToProps(state, ownProps) {
  const { configuration } = ownProps;
  return {
    ...ownProps,
    entryPoints: _.get(configuration, 'textViewEntryPoints', []),
    // connectedData: textView.getConnectedDataFromState(state, _.get(ownProps, 'viewId')),
    links: _.get(configuration, 'links', []),
    defaultRatio: _.get(configuration, 'defaultRatio', {}),
  };
}

export default connect(mapStateToProps)(TextViewContainer);
