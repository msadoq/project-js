// import { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { getViewConfiguration, getViewContent } from '../../../../store/reducers/views';
import MimicView from './MimicView';
import { getViewEntryPoints } from '../../../../store/selectors/views';
import { getData } from '../../store/dataReducer';

const mapStateToProps = createStructuredSelector({
  content: getViewContent,
  configuration: getViewConfiguration,
  entryPoints: getViewEntryPoints,
  data: getData,
});
/*
MimicViewContainer.propTypes = {
  viewId: PropTypes.string.isRequired,
};*/

export const MimicViewContainer = connect(mapStateToProps, null)(MimicView);
export default connect(mapStateToProps)(MimicViewContainer);
