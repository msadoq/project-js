import React from 'react';
import PropTypes from 'prop-types';
import {
  Panel,
} from 'react-bootstrap';
import ViewParamsContainer from 'viewManager/commonEditor/ViewParamsContainer';

export default class OnboardAlarmTab extends React.Component {
  static contextTypes = {
    viewId: PropTypes.string,
  };
  state = {
    isTitleOpen: false,
  };

  openTitle = () => this.setState({ isTitleOpen: true });
  closeTitle = () => this.setState({ isTitleOpen: false });

  render() {
    const { viewId } = this.context;

    return (
      <Panel>
        <ViewParamsContainer viewId={viewId} />
      </Panel>
    );
  }
}
