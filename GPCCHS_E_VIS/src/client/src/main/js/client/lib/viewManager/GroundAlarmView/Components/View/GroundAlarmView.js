import React from 'react';

import Table from './Table';

/* eslint-disable react/prefer-stateless-function */
class GroundAlarmView extends React.Component {
  render() {
    return (
      <div style={{ height: '100%', width: '100%' }}>
        <Table {...this.props} />
      </div>
    );
  }
}

export default GroundAlarmView;
