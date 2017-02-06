import React from 'react';
import { Field, FormSection } from 'redux-form';

import {
  SelectButtonField,
} from '../Fields/';

export default class FormSectionLineStyle extends FormSection {
  static defaultProps = {
    pointsStyle: 'None',
  }

  render() {
    const pointsStyleButtons = [
      { label: 'None', icon: 'none' },
      { label: 'Triangle', icon: 'triangle' },
      { label: 'Square', icon: 'square' },
      { label: 'Dot', icon: 'dot' },
    ];
    return (
      <Field
        component={SelectButtonField}
        name="style"
        buttons={pointsStyleButtons}
      />
    );
  }
}
