import { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { updateLayout } from '../../store/actions/pages';
import { closeView } from '../../store/actions/views';
import selector from './ContentSelector';

import Content from './Content';

function mapDispatchToProps(dispatch, { focusedPageId }) {
  return bindActionCreators({
    closeView: viewId => closeView(focusedPageId, viewId),
    updateLayout: layout => updateLayout(focusedPageId, layout),
  }, dispatch);
}

const ContentContainer = connect(selector, mapDispatchToProps)(Content);

ContentContainer.propTypes = {
  windowId: PropTypes.string.isRequired,
  focusedPageId: PropTypes.string,
};

export default ContentContainer;
