import { PropTypes } from 'react';
import { connect } from 'react-redux';
import Explorer from './Explorer';

import { getExplorerTabName, getExplorerWidth } from '../../store/selectors/windows';
import { currentExplorer, updateExplorerWidth, displayExplorer } from '../../store/actions/windows';


const mapStateToProps = (state, { windowId }) => {
  const tabName = getExplorerTabName(state, { windowId });
  const width = getExplorerWidth(state, { windowId });

  return {
    currentTab: tabName || 'perRemoteId',
    width,
  };
};

const ExplorerContainer = connect(
  mapStateToProps,
  { currentExplorer, updateExplorerWidth, displayExplorer }
)(Explorer);

ExplorerContainer.propTypes = {
  windowId: PropTypes.string.isRequired,
};

export default ExplorerContainer;
