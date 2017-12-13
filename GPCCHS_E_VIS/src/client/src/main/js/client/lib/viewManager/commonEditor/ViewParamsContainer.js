// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #3622 : 09/03/2017 : Moving the editor files in viewManager, splitting between commonEditor and commonReduxForm.
// VERSION : 1.1.2 : DM : #3622 : 14/03/2017 : Move general variables at top level of a view
// VERSION : 1.1.2 : DM : #5828 : 21/03/2017 : Move getView/getViews simple selectors in store/reducers/views
// VERSION : 1.1.2 : DM : #5828 : 05/05/2017 : Add possibility to modify domainName and sessionName from GUI for view, page, window and workspace
// VERSION : 1.1.2 : DM : #5828 : 10/05/2017 : Add possibility to modify domainName and sessionName from GUI for view, page, window and workspace
// END-HISTORY
// ====================================================================

import { PropTypes } from 'react';
import { connect } from 'react-redux';
import { getView } from 'store/reducers/views';
import { getDomains } from 'store/reducers/domains';
import { getSessions } from 'store/reducers/sessions';
import {
  updateBgColor,
  updateTitle,
  updateTitleStyle,
  updateDomainName,
  updateSessionName,
} from 'store/actions/views';
import ViewParams from './ViewParams';

const mapStateToProps = (state, { viewId }) => {
  const view = getView(state, { viewId });
  return {
    backgroundColor: view.backgroundColor,
    title: view.title,
    titleStyle: view.titleStyle,
    links: view.links,
    defaultRatio: view.defaultRatio,
    domains: getDomains(state),
    sessions: getSessions(state),
    domainName: view.domainName,
    sessionName: view.sessionName,
  };
};

const ViewParamsContainer = connect(mapStateToProps, {
  updateBgColor,
  updateTitle,
  updateTitleStyle,
  updateDomainName,
  updateSessionName,
})(ViewParams);

ViewParamsContainer.propTypes = {
  viewId: PropTypes.string.isRequired,
};

export default ViewParamsContainer;
