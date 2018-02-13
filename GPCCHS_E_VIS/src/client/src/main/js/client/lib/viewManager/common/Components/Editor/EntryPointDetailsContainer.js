import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateEntryPoint } from 'store/actions/views';
import { getViewEntryPointsSubPanels } from 'store/reducers/ui/editor';
import { updateViewSubPanels } from 'store/actions/ui';
import EntryPointDetails from './EntryPointDetails';

const mapStateToProps = (state, { viewId, entryPoint }) => ({
  panels: getViewEntryPointsSubPanels(state, { viewId, entryPoint }),
});

const EntryPointDetailsContainer = connect(mapStateToProps, {
  updateEntryPoint,
  updateViewSubPanels,
})(EntryPointDetails);

const { string, shape } = PropTypes;

EntryPointDetailsContainer.propTypes = {
  entryPoint: shape({}),
  viewId: string.isRequired,
  pageId: string.isRequired,
};

export default EntryPointDetailsContainer;
