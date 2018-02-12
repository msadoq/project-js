import React from 'react';
import AlarmViewEntryPoints from 'viewManager/commonEditor/EntryPoint/AlarmViewEntryPoints';
import WithForm from 'viewManager/common/Hoc/WithForm';

const AlarmViewEntryPointsWithForm = WithForm(AlarmViewEntryPoints);

const GroundAlarmEditorForm = props =>
  (<AlarmViewEntryPointsWithForm {...props} />);

export default GroundAlarmEditorForm;
