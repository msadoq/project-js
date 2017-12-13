import { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { askOpenPage } from 'store/actions/pages';
import { add } from 'store/actions/messages';
import NoPage from './NoPage';

const mapDispatchToProps = (dispatch, { windowId }) => (
  bindActionCreators({
    askOpenPage: filePath => askOpenPage(windowId, filePath),
    addMessage: add,
  }, dispatch)
);

const NoPageContainer = connect(null, mapDispatchToProps)(NoPage);

NoPageContainer.propTypes = {
  windowId: PropTypes.string.isRequired,
};

export default NoPageContainer;
