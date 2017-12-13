import { PropTypes } from 'react';
import { connect } from 'react-redux';
import EntryPointDetails from './EntryPointDetails';
import {
  updateEntryPoint,
  removeEntryPoint,
} from '../../../../store/actions/views';
import { getViewEntryPointsSubPanels } from '../../../../store/reducers/ui/editor';
import { updateViewSubPanels } from '../../../../store/actions/ui';

const mapStateToProps = (state, { viewId, entryPoint }) => ({
  panels: getViewEntryPointsSubPanels(state, { viewId, entryPoint }),
});

const EntryPointDetailsContainer = connect(mapStateToProps, {
  updateEntryPoint,
  removeEntryPoint,
  updateViewSubPanels,
})(EntryPointDetails);

EntryPointDetailsContainer.propTypes = {
  viewId: PropTypes.string.isRequired,
};

export default EntryPointDetailsContainer;