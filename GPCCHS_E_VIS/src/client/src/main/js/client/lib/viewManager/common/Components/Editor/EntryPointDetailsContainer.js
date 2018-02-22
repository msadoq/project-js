import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { updateEntryPoint } from 'store/actions/views';
import { getViewEntryPointsSubPanels } from 'store/reducers/ui/editor';
import { updateViewSubPanels } from 'store/actions/ui';
import EntryPointDetails from './EntryPointDetails';
import WithForm from '../../Hoc/WithForm';

const mapStateToProps = (state, { viewId, entryPoint }) => ({
  panels: getViewEntryPointsSubPanels(state, { viewId, entryPoint }),
  initialValues: entryPoint,
});

const EntryPointDetailsContainer = connect(mapStateToProps, {
  // updateEntryPoint,
  updateViewSubPanels,
})(WithForm(EntryPointDetails));

const { string, shape } = PropTypes;

EntryPointDetailsContainer.propTypes = {
  entryPoint: shape({}),
  viewId: string.isRequired,
  pageId: string.isRequired,
};

export default EntryPointDetailsContainer;
