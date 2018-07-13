/* eslint-disable quote-props,no-unused-vars,arrow-body-style */
// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 10/04/2017 : prepare packet and history files
// VERSION : 1.1.2 : DM : #5828 : 11/04/2017 : Add getViewComponent function in viewManager
// VERSION : 1.1.2 : DM : #6127 : 12/04/2017 : Prepare minimalistic HistoryView . .
// VERSION : 2.0.0 : DM : #6127 : 22/09/2017 : HistoryView work with real data .
// VERSION : 2.0.0 : DM : #6127 : 22/09/2017 : Remove labels from props.data in HistoryView
// VERSION : 2.0.0 : DM : #6127 : 22/09/2017 : Create first basic table for HistoryView
// VERSION : 2.0.0 : DM : #6127 : 22/09/2017 : Add selected current to HistoryView
// VERSION : 2.0.0 : DM : #6127 : 22/09/2017 : Add rowHeight prop to HistoryView component
// VERSION : 2.0.0 : DM : #5806 : 06/12/2017 : Change all relative imports .
// END-HISTORY
// ====================================================================

import _ from 'lodash/fp';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addEntryPoint } from 'store/actions/views';
import { getIsPlaying } from '../../../../store/reducers/hsc';

import HistoryView from './HistoryView';
import { getData } from '../../store/dataReducer';
import { getConfigurationByViewId } from '../../../selectors';


const mapStateToProps = (state, { viewId }) => {
  const data = getData(state, { viewId });
  const conf = getConfigurationByViewId(state, { viewId });
  const last = _.getOr({}, 'last', data);
  const isPlaying = getIsPlaying(state);

  const scrollPosition =
    _.getOr(
      0,
      ['tables', 'history', 'scrollPosition'],
      conf
    );

  const trackRow = null;

  /*
  const isTrackingCurrentTimestamp =
    _.getOr(
      false,
      ['tables', 'history', 'isTrackingCurrentTimestamp'],
      conf
    );

  let minCurrentIndex = Infinity;

  if (isTrackingCurrentTimestamp) {
    minCurrentIndex = Object.keys(last).reduce((acc, cur) => {
      const { referenceTimestamp, index } = last[cur];

      if (referenceTimestamp < acc) {
        return index;
      }

      return acc;
    }, Infinity);
  }

  if (minCurrentIndex !== Infinity) {
    trackRow = minCurrentIndex;
  }

  if (trackRow === -1) {
    trackRow = null;
  }

  if (trackRow !== null) {
    scrollPosition = null;
  }
  */

  return {
    last,
    isPlaying,
    scrollPosition,
    trackRow,
  };
};

const mapDispatchToProps = (dispatch, { viewId }) => ({
  addEntryPoint: (entryPoint) => {
    dispatch(addEntryPoint(viewId, entryPoint));
  },
});

const HistoryViewContainer = connect(mapStateToProps, mapDispatchToProps)(HistoryView);

HistoryViewContainer.propTypes = {
  viewId: PropTypes.string.isRequired,
};

export default HistoryViewContainer;
