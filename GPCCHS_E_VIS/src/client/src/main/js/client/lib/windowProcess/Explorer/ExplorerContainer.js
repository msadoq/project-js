import { PropTypes } from 'react';
import { connect } from 'react-redux';
import Explorer from './Explorer';

import { getExplorerTabName } from '../../store/selectors/windows';
import { currentExplorer } from '../../store/actions/windows';


const mapStateToProps = (state, { windowId }) => {
  const tabName = getExplorerTabName(state, { windowId });

  return {
    currentTab: tabName || 'perRemoteId',
  };
};

const ExplorerContainer = connect(
  mapStateToProps,
  { currentExplorer }
)(Explorer);

ExplorerContainer.propTypes = {
  windowId: PropTypes.string.isRequired,
};

export default ExplorerContainer;
