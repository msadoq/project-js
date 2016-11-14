import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { PlotEditor } from './';
import * as actions from '../../../../store/actions/views';

const PlotEditorContainer = props => <PlotEditor {...props} />;

PlotEditorContainer.propTypes = {
  viewId: PropTypes.string.isRequired,
  viewType: PropTypes.string.isRequired,
  configuration: PropTypes.object,
  closeEditor: PropTypes.func
};

export default connect(null, actions)(PlotEditorContainer);
