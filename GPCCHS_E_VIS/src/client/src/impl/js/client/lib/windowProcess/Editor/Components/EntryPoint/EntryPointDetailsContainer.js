import { PropTypes } from 'react';
import { connect } from 'react-redux';
import EntryPointDetails from './EntryPointDetails';
import { getView } from '../../../../store/selectors/views';
import {
  updateEntryPoint,
  removeEntryPoint
} from '../../../../store/actions/views';

const mapStateToProps = (state, { viewId }) => {
  const view = getView(state, viewId);
  return {
    title: view.configuration.title,
    titleStyle: view.configuration.titleStyle
  };
};

const EntryPointDetailsContainer = connect(mapStateToProps, {
  updateEntryPoint,
  removeEntryPoint
})(EntryPointDetails);

EntryPointDetailsContainer.propTypes = {
  viewId: PropTypes.string.isRequired
};

export default EntryPointDetailsContainer;