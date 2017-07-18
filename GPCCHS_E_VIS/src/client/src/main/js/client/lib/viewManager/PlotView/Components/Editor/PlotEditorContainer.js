import { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';

import PlotEditor from './PlotEditor';
import {
  removeEntryPoint,
  updateEditorSearch,
} from '../../../../store/actions/views';
import {
  open as openModal,
} from '../../../../store/actions/modals';
import { updateViewPanels, updateViewEntryPointsPanels, updateViewTab }
  from '../../../../store/actions/ui';
import { getViewPanels, getViewEntryPointsPanels, getViewTab } from '../../../../store/reducers/ui/editor';
import { getConfigurationByViewId } from '../../../../viewManager';

const mapStateToProps = createStructuredSelector({
  configuration: getConfigurationByViewId,
  panels: getViewPanels,
  tab: getViewTab,
  entryPointsPanels: getViewEntryPointsPanels,
});

const mapDispatchToProps = (dispatch, { viewId }) => bindActionCreators({
  openModal,
  removeEntryPoint,
  updateViewPanels,
  updateViewTab,
  updateViewEntryPointsPanels,
  updateEditorSearch: search => updateEditorSearch(viewId, search),
}, dispatch);

const PlotEditorContainer = connect(mapStateToProps, mapDispatchToProps)(PlotEditor);

PlotEditorContainer.propTypes = {
  viewId: PropTypes.string.isRequired,
};

export default PlotEditorContainer;
