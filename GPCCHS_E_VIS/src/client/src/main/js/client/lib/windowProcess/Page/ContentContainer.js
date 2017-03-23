import { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { updateLayout } from '../../store/actions/pages';
import { closeView } from '../../store/actions/views';
import selector from './ContentSelector';

import Content from './Content';

function mapDispatchToProps(dispatch, { pageId }) {
  return bindActionCreators({
    closeView: viewId => closeView(pageId, viewId),
    updateLayout: layout => updateLayout(pageId, layout),
  }, dispatch);
}

const ContentContainer = connect(selector, mapDispatchToProps)(Content);

ContentContainer.propTypes = {
  windowId: PropTypes.string.isRequired,
  pageId: PropTypes.string,
};

export default ContentContainer;
