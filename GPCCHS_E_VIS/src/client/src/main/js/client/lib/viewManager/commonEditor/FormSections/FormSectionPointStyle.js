// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #3622 : 09/03/2017 : Moving the editor files in viewManager, splitting between commonEditor and commonReduxForm.
// VERSION : 1.1.2 : DM : #5828 : 21/03/2017 : importing exact path instead of .. from index.js .
// END-HISTORY
// ====================================================================

import React from 'react';
import { Field, FormSection } from 'redux-form';
import SelectButtonField from '../../../windowProcess/commonReduxForm/SelectButtonField';

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
