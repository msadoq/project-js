// ====================================================================
// HISTORY
// VERSION : 1.1.0 : : : 28/02/2017 : Initial version
// VERSION : 1.1.2 : DM : #3622 : 16/02/2017 : fix reselect signature linting errors
// VERSION : 1.1.2 : DM : #3622 : 24/02/2017 : Refactoring of dataMap generation using reselect
// VERSION : 1.1.2 : DM : #3622 : 03/03/2017 : Work on Maximize and collapse bugs
// VERSION : 1.1.2 : DM : #3622 : 03/03/2017 : Work on Maximize and collapse views
// VERSION : 1.1.2 : DM : #3622 : 07/03/2017 : first draft on inspector: retrieve data from rtd on right-click
// VERSION : 1.1.2 : DM : #3622 : 08/03/2017 : merge dev in working branch
// VERSION : 1.1.2 : DM : #3622 : 10/03/2017 : store collapsed & maximized bool in page layout
// VERSION : 1.1.2 : DM : #3622 : 14/03/2017 : Move general variables at top level of a view
// VERSION : 1.1.2 : DM : #5828 : 16/03/2017 : Fix View components should not re-mount after open editor
// VERSION : 1.1.2 : DM : #5828 : 16/03/2017 : Refacto collapsed maximized using selectors
// VERSION : 1.1.2 : DM : #5828 : 20/03/2017 : Move getPage and getPages selectors
// VERSION : 1.1.2 : DM : #5822 : 20/03/2017 : merge dev in working branch
// VERSION : 1.1.2 : DM : #5828 : 20/03/2017 : Creation of data store for plotView
// VERSION : 1.1.2 : DM : #5828 : 21/03/2017 : Move getView/getViews simple selectors in store/reducers/views
// VERSION : 1.1.2 : DM : #5822 : 21/03/2017 : merge dev in working branch
// VERSION : 1.1.2 : DM : #5822 : 22/03/2017 : merge dev in working branch
// VERSION : 1.1.2 : DM : #5828 : 18/04/2017 : add context menu on views
// VERSION : 1.1.2 : DM : #5828 : 03/05/2017 : update MoveViewToPage modal to the generic modal
// VERSION : 1.1.2 : DM : #5828 : 03/05/2017 : Fix editor search on open
// VERSION : 1.1.2 : FA : ISIS-FT-2132 : 15/06/2017 : Ask to save before closing view or page
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 18/07/2017 : On save view middleware .
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 18/07/2017 : Add onSaveViewAsModel documents middleware .
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 18/07/2017 : Add onReloadView documents middleware .
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 18/07/2017 : Add onSaveView documents middleware .
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 21/07/2017 : Clean IPC about openInspector .
// VERSION : 1.1.2 : DM : #6700 : 03/08/2017 : Merge branch 'dev' into dbrugne-data
// END-HISTORY
// ====================================================================

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getPage, getPanels } from 'store/reducers/pages';
import { getView } from 'store/reducers/views';
import { updateEditorSearch, askSaveView, askCloseView, askReloadView, askSaveViewAsModel } from 'store/actions/views';
import { open as openModal, close as closeModal } from 'store/actions/modals';
import { setCollapsed, setMaximized, openEditor, minimizeEditor } from 'store/actions/pages';
import { askOpenInspector } from 'store/actions/inspector';
import View from './View';

const makeMapStateToProps = () => {
  const mapStateToProps = (state, { viewId, pageId }) => {
    const { type, oId, absolutePath, isModified, backgroundColor, titleStyle, title }
        = getView(state, { viewId });

    const page = getPage(state, { pageId });
    const collapsedLayout = page.layout.find(e => e.i === viewId && e.collapsed);
    const { editorIsMinimized, editorViewId } = getPanels(state, { pageId });

    return {
      backgroundColor,
      type,
      title,
      titleStyle,
      oId,
      absolutePath,
      isModified,
      pageId,
      collapsed: !!collapsedLayout,
      isViewsEditorOpen: !editorIsMinimized && editorViewId === viewId,
    };
  };
  return mapStateToProps;
};

const mapDispatchToProps = (dispatch, { windowId, pageId, viewId }) => bindActionCreators({
  collapseView: flag =>
    setCollapsed(pageId, viewId, flag),
  maximizeView: flag =>
    setMaximized(pageId, viewId, flag),
  openEditor: (pattern = '') => (disp) => {
    disp(updateEditorSearch(viewId, pattern));
    disp(openEditor(pageId, viewId));
  },
  closeEditor: () => minimizeEditor(pageId, true),
  openModal: args => openModal(windowId, { windowId, pageId, viewId, ...args }),
  closeModal: () => closeModal(windowId),
  save: () => askSaveView(viewId, false),
  saveAs: () => askSaveView(viewId, true),
  closeView: () => askCloseView(viewId),
  reloadView: () => askReloadView(viewId),
  saveViewAsModel: () => askSaveViewAsModel(viewId),
  askOpenInspector,
}, dispatch);

// return function to avoid page grid layout and React DOM re-conciliation issue
export default connect(makeMapStateToProps, mapDispatchToProps)(View);
