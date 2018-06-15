// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #3622 : 17/02/2017 : Move VIVL files in lib/viewManager and fix plenty of
//  inline view/structure type specific code
// VERSION : 1.1.2 : DM : #5828 : 13/04/2017 : By default, dynamicView has no filter, and
//  DV.configuration.entryPoints is a, array of objects.
// VERSION : 1.1.2 : DM : #5828 : 13/04/2017 : EntryPoint addition now uses GenericModal. General
//  refacto of default EntryPoints props, set in viewManager's setDefaultEntryPoint for text, plot
//  and Dynamic.
// VERSION : 1.1.2 : DM : #5828 : 14/06/2017 : Move common/log and common/parameters in client/
// VERSION : 2.0.0 : DM : #5806 : 24/10/2017 : Fix DynamicView setEntryPointDefault and
//  prepareViewForStore
// VERSION : 2.0.0 : FA : ISIS-FT-2309 : 14/11/2017 : Forgotten file to transfer .
// VERSION : 2.0.0 : DM : #5806 : 06/12/2017 : Change all relative imports .
// VERSION : 2.0.0 : FA : ISIS-FT-2309 : 31/01/2018 : surveillance du monitoringState pour
//  parametres TM VIMA
// VERSION : 2.0.0 : FA : #10772 : 27/02/2018 : deals with default values and nested values (i.e.
//  connectedData attributes) in submitted form entry points
// END-HISTORY
// ====================================================================

import { get } from 'common/configurationManager';
import { applyDefaultValues } from 'utils/views';

export default function (entryPoint) {
  return applyDefaultValues(entryPoint, getNewDynamicEntryPoint());
}

const getNewDynamicEntryPoint = () => ({
  name: 'decommutedPacketEP',
  connectedData: {
    domain: get('WILDCARD_CHARACTER'),
    timeline: get('WILDCARD_CHARACTER'),
    formula: '',
  },
  stateColors: [],
});
