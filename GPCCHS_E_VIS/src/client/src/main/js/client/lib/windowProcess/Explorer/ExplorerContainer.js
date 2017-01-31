import { PropTypes } from 'react';
import { connect } from 'react-redux';
import _get from 'lodash/get';
import Explorer from './Explorer';
import {
  getLastPubSubTimestamp,
  getDcStatus,
  getHssStatus
} from '../../store/selectors/health';
import dataMapGenerator from '../../dataManager/map';


const mapStateToProps = (state) => {
  const dcStatus = getDcStatus(state);
  const hssStatus = getHssStatus(state);
  const lastPubSubTime = getLastPubSubTimestamp(state);
  const dataMap = dataMapGenerator(state);
  const viewData = _get(state, ['viewData']);

  return {
    dcStatus,
    hssStatus,
    lastPubSubTime,
    ...dataMap,
    viewData,
  };
};

const ExplorerContainer = connect(mapStateToProps)(Explorer);

ExplorerContainer.propTypes = {
  windowId: PropTypes.string.isRequired,
};

export default ExplorerContainer;
