import React from 'react';
import { Field, FormSection } from 'redux-form';

import {
  SelectButtonField
} from '../Fields/';

export default class FormSectionLineStyle extends FormSection {
  static defaultProps = {
    lineStyle: 'Continuous'
  }

  render() {
    return (
      <Field
        component={SelectButtonField}
        name="style"
        buttons={[
          { label: 'Continuous', icon: 'continuous' },
          { label: 'Dashed', icon: 'dashed' },
          { label: 'Dotted', icon: 'doted' }
        ]}
      />
    );
  }
}
