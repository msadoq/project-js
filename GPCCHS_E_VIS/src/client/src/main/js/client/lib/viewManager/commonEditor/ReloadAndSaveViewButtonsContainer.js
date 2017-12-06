import { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import {
  askReloadView,
  askSaveView,
} from 'store/actions/views';

import { getViewIsModified } from 'store/reducers/views';
import ReloadAndSaveViewButtons from './ReloadAndSaveViewButtons';

const mapStateToProps = createStructuredSelector({
  isModified: getViewIsModified,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  askReloadView,
  askSaveView,
}, dispatch);

const PlotEditorContainer = connect(mapStateToProps, mapDispatchToProps)(ReloadAndSaveViewButtons);

PlotEditorContainer.propTypes = {
  viewId: PropTypes.string.isRequired,
};

export default PlotEditorContainer;
