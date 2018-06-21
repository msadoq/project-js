import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import HorizontalFormGroup from 'windowProcess/commonReduxForm/HorizontalFormGroup';
import ReactSelectField from 'windowProcess/commonReduxForm/ReactSelectField';
import ErrorBoundary from 'viewManager/common/Components/ErrorBoundary';
import * as constants from '../../../constants';

const MODES = [
  { value: constants.ALARM_MODE_ALL, label: 'All' },
  { value: constants.ALARM_MODE_NONNOMINAL, label: 'Non nominal' },
  { value: constants.ALARM_MODE_TOACKNOWLEDGE, label: 'To Acknowledge' },
];

/**
 * Corresponding views:
 *  - OnBoardAlarmView
 *  - GroundAlarmView
 */
export default class AlarmViewEntryPoints extends PureComponent {
  static propTypes = {
    timeline: PropTypes.string,
    domain: PropTypes.string,
  };

  static defaultProps = {
    timeline: null,
    domain: null,
  };

  static contextTypes = {
    windowId: PropTypes.string,
  };

  render() {
    return (
      <ErrorBoundary>
        <HorizontalFormGroup label="Mode">
          <Field
            name="mode"
            clearable={false}
            component={ReactSelectField}
            options={MODES}
          />
        </HorizontalFormGroup>
      </ErrorBoundary>
    );
  }
}
