import { PropTypes } from 'react';
import { connect } from 'react-redux';
import { getPanels } from 'store/reducers/pages';

import { focusTabInExplorer, minimizeExplorer } from 'store/actions/pages';
import Explorer from './Explorer';

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
