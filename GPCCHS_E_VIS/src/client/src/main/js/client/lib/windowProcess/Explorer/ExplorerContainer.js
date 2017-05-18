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
