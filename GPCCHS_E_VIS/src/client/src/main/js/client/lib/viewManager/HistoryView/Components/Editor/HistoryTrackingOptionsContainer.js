import _ from 'lodash/fp';
import { connect } from 'react-redux';
import HistoryTrackingOptions from './HistoryTrackingOptions';
import { getConfigurationByViewId } from '../../../selectors';
import { toggleHistoryCurrentTimestampTracking } from '../../store/actions';


const mapStateToProps = (state, { viewId }) => {
  const conf = getConfigurationByViewId(state, { viewId });
  const currentTimestampTracking =
    _.getOr(
      false,
      ['tables', 'history', 'isTrackingCurrentTimestamp'],
      conf
    );

  return {
    currentTimestampTracking,
  };
};

const mapDispatchToProps = (dispatch, { viewId }) => ({
  onToggleCurrentTimestampTracking: () => {
    dispatch(toggleHistoryCurrentTimestampTracking(viewId));
  },
});

const HistoryTrackingOptionsContainer =
  connect(mapStateToProps, mapDispatchToProps)(HistoryTrackingOptions);

export default HistoryTrackingOptionsContainer;
