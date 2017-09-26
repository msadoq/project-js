// ====================================================================
// HISTORY
// VERSION : 1.1.0 : : : 28/02/2017 : Initial version
// VERSION : 1.1.2 : DM : #3622 : 09/02/2017 : Cleaning of explorer window process
// VERSION : 1.1.2 : DM : #3622 : 14/02/2017 : Explorer Right panel refactoring .
// VERSION : 1.1.2 : DM : #3622 : 16/02/2017 : fix reselect signature linting errors
// VERSION : 1.1.2 : DM : #5828 : 15/03/2017 : Remove the explorer resizable behavior and use panels data to handle show/hide
// VERSION : 1.1.2 : DM : #5828 : 16/03/2017 : Add dataMap and store explorer widgets
// VERSION : 1.1.2 : DM : #5828 : 20/03/2017 : Move getPanels selectors in reducers folder
// VERSION : 1.1.2 : DM : #5828 : 11/04/2017 : Handle panel collapse/expand buttons with css instead of JE and react refs.
// END-HISTORY
// ====================================================================

import { PropTypes } from 'react';
import { connect } from 'react-redux';
import Explorer from './Explorer';

import { getPanels } from '../../store/reducers/pages';
import { focusTabInExplorer, minimizeExplorer } from '../../store/actions/pages';

const mapStateToProps = (state, { pageId }) => {
  const { explorerTab: tabId } = getPanels(state, { pageId });

  return { tabId };
};

const ExplorerContainer = connect(
  mapStateToProps,
  { focusTabInExplorer, minimizeExplorer }
)(Explorer);

ExplorerContainer.propTypes = {
  pageId: PropTypes.string.isRequired,
};

export default ExplorerContainer;
