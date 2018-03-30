import React, { PureComponent, PropTypes } from 'react';
import { Field } from 'redux-form';
import HorizontalFormGroup from 'windowProcess/commonReduxForm/HorizontalFormGroup';
import ReactSelectField from 'windowProcess/commonReduxForm/ReactSelectField';
import * as constants from '../../../constants';

const MODES = [
  { value: constants.ALARM_MODE_ALL, label: 'All' },
  { value: constants.ALARM_MODE_NONNOMINAL, label: 'Non nominal' },
  { value: constants.ALARM_MODE_TOACKNOWLEDGE, label: 'To Acknowledge' },
];

const { string } = PropTypes;

/**
 * Corresponding views:
 *  - OnBoardAlarmView
 *  - GroundAlarmView
 */
export default class AlarmViewEntryPoints extends PureComponent {
  static propTypes = {
    timeline: string,
    domain: string,
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
      <HorizontalFormGroup label="Mode">
        <Field
          name="mode"
          clearable={false}
          component={ReactSelectField}
          options={MODES}
        />
      </HorizontalFormGroup>

    );
  }
}
