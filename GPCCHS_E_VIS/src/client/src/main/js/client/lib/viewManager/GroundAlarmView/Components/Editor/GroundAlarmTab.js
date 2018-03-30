import React from 'react';
import PropTypes from 'prop-types';
import {
  Panel,
} from 'react-bootstrap';
import ViewParamsContainer from 'viewManager/commonEditor/ViewParamsContainer';
import TableViewColumnsContainer from 'viewManager/commonEditor/TableViewColumnsContainer';

const { string } = PropTypes;

export default class GroundAlarmTab extends React.Component {
  static contextTypes = {
    viewId: string,
  };
  state = {
    isTitleOpen: false,
  };

  render() {
    const { viewId } = this.context;

    return (
      <Panel>
        <ViewParamsContainer viewId={viewId} />
        <TableViewColumnsContainer viewId={viewId} />
      </Panel>
    );
  }
}
