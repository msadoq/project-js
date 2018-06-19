// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #3622 : 09/03/2017 : Moving the editor files in viewManager, splitting
//  between commonEditor and commonReduxForm.
// VERSION : 1.1.2 : DM : #5828 : 21/03/2017 : importing exact path instead of .. from index.js .
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 19/07/2017 : Added dirty state in TextView, PlotView,
//  MimicView, DynamicView forms.
// VERSION : 2.0.0 : FA : ISIS-FT-2309 : 14/11/2017 : Remove monitoring state colors mecanism + add
//  defult values for state colors + update unit tests + fix issue when removing a state color +
//  fix css code style
// VERSION : 2.0.0 : DM : #5806 : 06/12/2017 : Change all relative imports .
// VERSION : 2.0.0 : FA : ISIS-FT-2309 : 31/01/2018 : surveillance du monitoringState pour
//  parametres TM VIMA
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
