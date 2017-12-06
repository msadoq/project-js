import React from 'react';
import { Field, FormSection } from 'redux-form';
import SelectButtonField from 'windowProcess/commonReduxForm/SelectButtonField';

export default class FormSectionLineStyle extends FormSection {
  static defaultProps = {
    lineStyle: 'Continuous',
  }

  render() {
    const lineStyleButtons = [
      { label: 'Continuous', icon: 'continuous' },
      { label: 'Dashed', icon: 'dashed' },
      { label: 'Dotted', icon: 'doted' },
    ];
    return (
      <Field
        component={SelectButtonField}
        name="style"
        buttons={lineStyleButtons}
      />
    );
  }
}
