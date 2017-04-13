import { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import PlotEditor from './PlotEditor';
import {
  removeEntryPoint,
} from '../../../../store/actions/views';
import {
  open as openModal,
} from '../../../../store/actions/modals';
import { getConfigurationByViewId } from '../../../../viewManager';

const mapStateToProps = createStructuredSelector({
  configuration: getConfigurationByViewId,
});

const mapDispatchToProps = {
  removeEntryPoint,
  openModal,
};

const PlotEditorContainer = connect(mapStateToProps, mapDispatchToProps)(PlotEditor);

PlotEditorContainer.propTypes = {
  viewId: PropTypes.string.isRequired,
};

export default PlotEditorContainer;
