import { PropTypes } from 'react';
import { connect } from 'react-redux';

import { getPage } from '../../store/reducers/pages';
import { getView } from '../../store/reducers/views';

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

const mapDispatchToProps = { };

const SaveBeforeClosingContainer = connect(mapStateToProps, mapDispatchToProps)(SaveBeforeClosing);

SaveBeforeClosingContainer.propTypes = {
  docType: PropTypes.string.isRequired,
  pageId: PropTypes.string,
  viewId: PropTypes.string,
};

export default SaveBeforeClosingContainer;
