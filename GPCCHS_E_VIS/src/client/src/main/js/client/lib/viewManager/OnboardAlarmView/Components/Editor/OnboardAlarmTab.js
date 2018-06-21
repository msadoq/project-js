import React from 'react';
import PropTypes from 'prop-types';
import {
  Panel,
} from 'react-bootstrap';
import ViewParamsContainer from 'viewManager/commonEditor/ViewParamsContainer';
import ErrorBoundary from 'viewManager/common/Components/ErrorBoundary';

export default class OnboardAlarmTab extends React.Component {
  static contextTypes = {
    viewId: PropTypes.string,
  };
  state = {
    isTitleOpen: false,
  };

  render() {
    const { viewId } = this.context;

    return (
      <ErrorBoundary>
        <Panel>
          <ViewParamsContainer viewId={viewId} />
        </Panel>
      </ErrorBoundary>
    );
  }
}
