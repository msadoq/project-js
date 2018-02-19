import React, { PropTypes, PureComponent } from 'react';
import { Field } from 'redux-form';
import HorizontalFormGroup from 'windowProcess/commonReduxForm/HorizontalFormGroup';
import ReactSelectField from 'windowProcess/commonReduxForm/ReactSelectField';
import DomainFieldContainer from 'viewManager/commonEditor/Fields/DomainFieldContainer';
import TimelineFieldContainer from 'viewManager/commonEditor/Fields/TimelineFieldContainer';
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
    windowId: React.PropTypes.string,
  };

  render() {
    const { timeline, domain } = this.props;
    const { windowId } = this.context;

    return (
      <div>
        <HorizontalFormGroup label="Domain">
          <DomainFieldContainer
            domainName={domain}
          />
        </HorizontalFormGroup>

        <HorizontalFormGroup label="Timeline">
          <TimelineFieldContainer
            windowId={windowId}
            timelineName={timeline}
          />
        </HorizontalFormGroup>

        <HorizontalFormGroup label="Mode">
          <Field
            name="mode"
            clearable={false}
            component={ReactSelectField}
            options={MODES}
          />
        </HorizontalFormGroup>
      </div>
    );
  }
}
