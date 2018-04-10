// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 23/08/2017 : On Plot/Text/Mimic/Dynamic editors: Save and
//  Reload buttons beneath the title.
// VERSION : 2.0.0 : DM : #5806 : 06/12/2017 : Change all relative imports .
// VERSION : 2.0.0 : FA : #9090 : 06/12/2017 : Disable reload button when a view is never saved
// END-HISTORY
// ====================================================================

import { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import {
  askReloadView,
  askSaveView,
} from 'store/actions/views';

import { getViewIsModified, getViewIsSaved } from 'store/reducers/views';
import ReloadAndSaveViewButtons from './ReloadAndSaveViewButtons';

const mapStateToProps = createStructuredSelector({
  isModified: getViewIsModified,
  isSaved: getViewIsSaved,
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
