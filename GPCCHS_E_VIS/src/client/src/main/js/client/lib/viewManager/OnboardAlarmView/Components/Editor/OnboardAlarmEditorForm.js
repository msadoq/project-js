import React from 'react';
import WithForm from 'viewManager/common/Hoc/WithForm';
import AlarmViewEntryPoints from '../../../commonEditor/EntryPoint/AlarmViewEntryPoints';

const AlarmViewEntryPointsWithForm = WithForm(AlarmViewEntryPoints);

const OnboardAlarmEditorForm = props =>
  (<AlarmViewEntryPointsWithForm {...props} />);

export default OnboardAlarmEditorForm;
