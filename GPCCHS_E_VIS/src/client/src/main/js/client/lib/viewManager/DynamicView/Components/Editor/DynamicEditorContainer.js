// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #3622 : 09/03/2017 : Moving the editor files in viewManager, splitting between commonEditor and commonReduxForm.
// VERSION : 1.1.2 : DM : #3622 : 14/03/2017 : Move general variables at top level of a view
// VERSION : 1.1.2 : DM : #5828 : 20/03/2017 : Move getPage and getPages selectors
// VERSION : 1.1.2 : DM : #5828 : 21/03/2017 : Move getView/getViews simple selectors in store/reducers/views
// VERSION : 1.1.2 : DM : #5828 : 23/03/2017 : Cleanup React components tree and props
// VERSION : 1.1.2 : DM : #5828 : 24/03/2017 : Cleanup React components tree and props
// VERSION : 1.1.2 : DM : #5828 : 03/04/2017 : Add configuration selectors in ViewManager
// VERSION : 1.1.2 : DM : #5828 : 10/04/2017 : USe new configuration in DynamicView
// VERSION : 1.1.2 : DM : #5828 : 09/05/2017 : Main tab is stored in store for Dynamic Plot & Text. state.ui
// VERSION : 1.1.2 : DM : #5828 : 10/05/2017 : In Text Plot and Dynamic, domain is a dropdown list of available domains, timeline is not a free dropdown anymore.
// VERSION : 1.1.2 : DM : #5828 : 10/05/2017 : Main tab is stored in store for Dynamic Plot & Text. state.ui
// VERSION : 1.1.2 : DM : #6785 : 31/05/2017 : Add Misc/links in view editor
// VERSION : 1.1.2 : DM : #6700 : 06/07/2017 : Split ui reducer + prepare ui/dialog reducer
// END-HISTORY
// ====================================================================

import { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { getConfigurationByViewId } from 'viewManager';
import { getPageTimelines } from 'store/selectors/timelines';
import { getViewTitle, getViewTitleStyle } from 'store/reducers/views';
import { open as openModal } from 'store/actions/modals';
import { updateViewTab, updateViewPanels } from 'store/actions/ui';
import { getViewTab, getViewPanels } from 'store/reducers/ui/editor';
import { getDomains } from 'store/reducers/domains';
import {
  updateEntryPoint,
  updateTitle,
  updateTitleStyle,
} from 'store/actions/views';
import DynamicEditor from './DynamicEditor';

const mapStateToProps = createStructuredSelector({
  title: getViewTitle,
  titleStyle: getViewTitleStyle,
  configuration: getConfigurationByViewId,
  timelines: getPageTimelines,
  domains: getDomains,
  tab: getViewTab,
  panels: getViewPanels,
});

const mapDispatchToProps = {
  updateEntryPoint,
  updateTitle,
  updateTitleStyle,
  updateViewTab,
  updateViewPanels,
  openModal,
};

const DynamicEditorContainer = connect(mapStateToProps, mapDispatchToProps)(DynamicEditor);

DynamicEditorContainer.propTypes = {
  viewId: PropTypes.string.isRequired,
  pageId: PropTypes.string.isRequired,
};

export default DynamicEditorContainer;
