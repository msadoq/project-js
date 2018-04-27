import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import HorizontalFormGroup from 'windowProcess/commonReduxForm/HorizontalFormGroup';
import DomainFieldContainer from 'viewManager/commonEditor/Fields/DomainFieldContainer';
import TimelineFieldContainer from 'viewManager/commonEditor/Fields/TimelineFieldContainer';
import ApplicationProcessFieldContainer from 'viewManager/commonEditor/Fields/ApplicationProcessFieldContainer';

// eslint-disable-next-line react/prefer-stateless-function
export default class DefaultPusData extends PureComponent {
  static contextTypes = {
    windowId: PropTypes.string,
  };

  render() {
    const { windowId } = this.context;

    return (
      <React.Fragment>
        <HorizontalFormGroup label="Application Process">
          <ApplicationProcessFieldContainer />
        </HorizontalFormGroup>

        <HorizontalFormGroup label="Domain">
          <DomainFieldContainer />
        </HorizontalFormGroup>

        <HorizontalFormGroup label="Timeline">
          <TimelineFieldContainer
            windowId={windowId}
          />
        </HorizontalFormGroup>
      </React.Fragment>
    );
  }
}
