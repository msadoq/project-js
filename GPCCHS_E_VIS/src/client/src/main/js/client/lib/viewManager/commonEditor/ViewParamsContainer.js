import { PropTypes } from 'react';
import { connect } from 'react-redux';
import ViewParams from './ViewParams';
import { getView } from '../../store/reducers/views';
import {
  updateBgColor,
  updateTitle,
  updateTitleStyle,
} from '../../store/actions/views';

const mapStateToProps = (state, { viewId }) => {
  const view = getView(state, { viewId });
  return {
    backgroundColor: view.backgroundColor,
    title: view.title,
    titleStyle: view.titleStyle,
    links: view.links,
    defaultRatio: view.defaultRatio,
  };
};

const ViewParamsContainer = connect(mapStateToProps, {
  updateBgColor,
  updateTitle,
  updateTitleStyle,
})(ViewParams);

ViewParamsContainer.propTypes = {
  viewId: PropTypes.string.isRequired,
};

export default ViewParamsContainer;
