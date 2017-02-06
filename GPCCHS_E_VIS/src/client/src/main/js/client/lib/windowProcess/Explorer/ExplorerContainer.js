import { PropTypes } from 'react';
import { connect } from 'react-redux';
import Explorer from './Explorer';
import {
  getLastPubSubTimestamp,
  getDcStatus,
  getHssStatus,
} from '../../store/selectors/health';
import dataMapGenerator from '../../dataManager/map';
import { getExplorerTabName, getExplorerWidth } from '../../store/selectors/windows';
import { getViews } from '../../store/selectors/views';
import { currentExplorer, updateExplorerWidth } from '../../store/actions/windows';
import { main } from '../../windowProcess/ipc';
import parseFormula from '../../dataManager/structures/common/formula';


const mapStateToProps = (state, { windowId }) => {
  const tabName = getExplorerTabName(state, windowId);
  const width = getExplorerWidth(state, windowId);
  if (!tabName || tabName === 'perRemoteId') {
    const dataMap = dataMapGenerator(state);
    return {
      perRemoteId: dataMap.perRemoteId,
      currentTab: tabName || 'perRemoteId',
      parseFormula,
      width,
    };
  } else if (tabName === 'perViewId') {
    const dataMap = dataMapGenerator(state);
    return {
      perView: dataMap.perView,
      currentTab: tabName,
      parseFormula,
      views: getViews(state),
      width,
    };
  } else if (tabName === 'health') {
    const dcStatus = getDcStatus(state);
    const hssStatus = getHssStatus(state);
    const lastPubSubTime = getLastPubSubTimestamp(state);
    return {
      dcStatus,
      hssStatus,
      lastPubSubTime,
      currentTab: tabName,
      width,
    };
  } else if (tabName === 'server') {
    let server;
    main.serverDebug((debug) => {
      server = debug;
    });
    return {
      server,
      currentTab: tabName,
      width,
    };
  }
  return {
    perRemoteId: dataMapGenerator(state).perRemoteId,
    currentTab: 'perRemoteId',
    parseFormula,
    width,
  };
};

const ExplorerContainer = connect(
  mapStateToProps,
  { currentExplorer, updateExplorerWidth }
)(Explorer);

ExplorerContainer.propTypes = {
  windowId: PropTypes.string.isRequired,
};

export default ExplorerContainer;
