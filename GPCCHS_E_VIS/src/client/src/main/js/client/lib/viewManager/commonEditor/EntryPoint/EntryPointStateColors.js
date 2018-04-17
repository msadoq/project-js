// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #3622 : 09/03/2017 : Moving the editor files in viewManager, splitting between commonEditor and commonReduxForm.
// VERSION : 1.1.2 : DM : #5828 : 21/03/2017 : importing exact path instead of .. from index.js .
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 19/07/2017 : Added dirty state in TextView, PlotView, MimicView, DynamicView forms.
// END-HISTORY
// ====================================================================

import React from 'react';
import {
  FieldArray,
} from 'redux-form';
import StateColorsFields from 'viewManager/commonEditor/Fields/StateColorsFields';

const EntryPointStateColors = () => (
  <FieldArray
    name="stateColors"
    component={StateColorsFields}
  />
);

export default EntryPointStateColors;
