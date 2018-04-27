import React from 'react';
import WithForm from 'viewManager/common/Hoc/WithForm';
import DefaultPusData from 'viewManager/commonEditor/DefaultPusData';

const DefaultPusDataWithForm = WithForm(DefaultPusData);

const PUS11EditorForm = props =>
  (<DefaultPusDataWithForm {...props} />);

export default PUS11EditorForm;
