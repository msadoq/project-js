import { PropTypes } from 'react';
import { connect } from 'react-redux';
import ViewParams from './ViewParams';
import { getView } from '../../../store/selectors/views';
import {
  updateBgColor,
  updateTitle,
  updateTitleStyle
} from '../../../store/actions/views';

const mapStateToProps = (state, { viewId }) => {
  const view = getView(state, viewId);
  return {
    backgroundColour: view.configuration.backgroundColour,
    title: view.configuration.title,
    titleStyle: view.configuration.titleStyle
  };
};

const ViewParamsContainer = connect(mapStateToProps, {
  updateBgColor,
  updateTitle,
  updateTitleStyle,
})(ViewParams);

ViewParamsContainer.propTypes = {
  viewId: PropTypes.string.isRequired
};

export default ViewParamsContainer;
