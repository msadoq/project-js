// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #3622 : 09/03/2017 : Moving the editor files in viewManager, splitting
//  between commonEditor and commonReduxForm.
// VERSION : 2.0.0 : DM : #5806 : 06/12/2017 : Change all relative imports .
// END-HISTORY
// ====================================================================

import React from 'react';
import PropTypes from 'prop-types';
import {
  Panel,
} from 'react-bootstrap';
import ViewParamsContainer from 'viewManager/commonEditor/ViewParamsContainer';

export default class DynamicTab extends React.Component {
  static contextTypes = {
    viewId: PropTypes.string,
  };
  state = {
    isTitleOpen: false,
  };

  openTitle = () => this.setState({ isTitleOpen: true });
  closeTitle = () => this.setState({ isTitleOpen: false });

  render() {
    const { viewId } = this.context;

    return (
      <Panel>
        <ViewParamsContainer viewId={viewId} />
      </Panel>
    );
  }
}
