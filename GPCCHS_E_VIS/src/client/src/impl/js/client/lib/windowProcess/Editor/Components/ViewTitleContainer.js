import { PropTypes } from 'react';
import { connect } from 'react-redux';
import ViewTitle from './ViewTitle';
import { getView } from '../../../store/selectors/views';
import {
  updateTitle,
  updateTitleStyle
} from '../../../store/actions/views';

const mapStateToProps = (state, { viewId }) => {
  const view = getView(state, viewId);
  return {
    title: view.configuration.title,
    titleStyle: view.configuration.titleStyle
  };
};

const ViewTitleContainer = connect(mapStateToProps, {
  updateTitle,
  updateTitleStyle,
})(ViewTitle);

ViewTitleContainer.propTypes = {
  viewId: PropTypes.string.isRequired
};

export default ViewTitleContainer;
