import { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getPage } from '../../store/reducers/pages';
import { getView } from '../../store/reducers/views';
import { closeView } from '../../store/actions/views';
import { minimizeEditor, closePage } from '../../store/actions/pages';

import SaveBeforeClosing from './SaveBeforeClosing';

const mapStateToProps = (state, { docType, pageId, viewId }) => {
  let title = '';
  if (docType === 'view') {
    const view = getView(state, { viewId });
    if (view) {
      title = view.title;
    }
  } else if (docType === 'page') {
    const page = getPage(state, { pageId });
    if (page) {
      title = page.title;
    }
  }
  return {
    docType,
    title,
  };
};

const mapDispatchToProps = (dispatch, { windowId, pageId, viewId }) => bindActionCreators({
  closeView: () => closeView(pageId, viewId),
  closeEditor: () => minimizeEditor(pageId, true),
  closePage: () => closePage(windowId, pageId),
}, dispatch);

const SaveBeforeClosingContainer = connect(mapStateToProps, mapDispatchToProps)(SaveBeforeClosing);

SaveBeforeClosingContainer.propTypes = {
  docType: PropTypes.string.isRequired,
  pageId: PropTypes.string.isRequired,
  viewId: PropTypes.string,
  windowId: PropTypes.string.isRequired,
};

export default SaveBeforeClosingContainer;
