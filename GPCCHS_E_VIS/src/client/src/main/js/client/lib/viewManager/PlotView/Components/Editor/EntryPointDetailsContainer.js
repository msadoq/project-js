import { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import EntryPointDetails from './EntryPointDetails';

import { getAxes, getFocusedPageTimelines } from '../../store/configurationSelectors';
import {
  updateEntryPoint,
  removeEntryPoint,
} from '../../../../store/actions/views';

const mapStateToProps = createStructuredSelector({
  axes: getAxes,
  timelines: getFocusedPageTimelines,
});

const mapDispatchToProps = {
  updateEntryPoint,
  removeEntryPoint,
};

const EntryPointDetailsContainer = connect(mapStateToProps, mapDispatchToProps)(EntryPointDetails);

EntryPointDetailsContainer.propTypes = {
  viewId: PropTypes.string.isRequired,
};

export default EntryPointDetailsContainer;
