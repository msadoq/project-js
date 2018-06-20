import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getViewEntryPointsSubPanels } from 'store/reducers/ui/editor';
import { updateViewSubPanels } from 'store/actions/ui';
import EntryPointDetails from './EntryPointDetails';
import WithForm from '../../Hoc/WithForm';

const mapStateToProps = (state, { viewId, entryPoint }) => ({
  panels: getViewEntryPointsSubPanels(state, { viewId, entryPoint }),
  initialValues: entryPoint,
});

const EntryPointDetailsContainer = connect(mapStateToProps, {
  updateViewSubPanels,
})(WithForm(EntryPointDetails));

EntryPointDetailsContainer.propTypes = {
  entryPoint: PropTypes.shape({}),
  viewId: PropTypes.string.isRequired,
  pageId: PropTypes.string.isRequired,
};

export default EntryPointDetailsContainer;
