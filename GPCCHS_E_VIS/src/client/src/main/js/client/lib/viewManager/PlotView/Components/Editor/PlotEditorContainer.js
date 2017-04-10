import { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import PlotEditor from './PlotEditor';
import {
  addEntryPoint,
  removeEntryPoint,
} from '../../../../store/actions/views';
import { getConfigurationByViewId } from '../../../../viewManager';

const mapStateToProps = createStructuredSelector({
  configuration: getConfigurationByViewId,
});

const mapDispatchToProps = {
  addEntryPoint,
  removeEntryPoint,
};

const PlotEditorContainer = connect(mapStateToProps, mapDispatchToProps)(PlotEditor);

PlotEditorContainer.propTypes = {
  viewId: PropTypes.string.isRequired,
};

export default PlotEditorContainer;
