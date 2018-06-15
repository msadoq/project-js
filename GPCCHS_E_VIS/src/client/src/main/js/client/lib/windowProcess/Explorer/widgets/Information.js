// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 23/03/2017 : Add information widget in explorer with
//  masterSession and configuration
// VERSION : 1.1.2 : DM : #5828 : 24/03/2017 : Add information widget in explorer with
//  masterSession and configuration
// VERSION : 1.1.2 : DM : #6302 : 04/04/2017 : Add comment and fix coding convetions warning and
//  un-needed relaxations
// VERSION : 1.1.2 : DM : #5828 : 10/04/2017 : Change 'configuration' prop by 'parameters' in
//  InformationContainer
// END-HISTORY
// ====================================================================

import React from 'react';
import PropTypes from 'prop-types';
import Inspector from 'react-json-inspector';

const Information = ({ parameters, masterSession }) => (
  <div>
    <h3>Master Session</h3>
    <Inspector data={masterSession} />
    <h3>Configuration</h3>
    <Inspector data={parameters} />
  </div>
);

Information.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types, "DV6 TBC_CNES Unpredicatable object struct."
  parameters: PropTypes.object.isRequired,
  masterSession: PropTypes.shape({
    name: PropTypes.string,
  }),
};

Information.defaultProps = {
  masterSession: {},
};

export default Information;
