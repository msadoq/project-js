// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 24/04/2017 : Edit window title available through upper menu Window -> Rename.
// VERSION : 1.1.2 : DM : #5828 : 05/05/2017 : Add possibility to modify domainName and sessionName from GUI for view, page, window and workspace
// VERSION : 1.1.2 : DM : #5828 : 09/05/2017 : remove domain and session on window apply domain and session of view, page or workspace in case of wildcard
// VERSION : 1.1.2 : DM : #5828 : 10/05/2017 : Add possibility to modify domainName and sessionName from GUI for view, page, window and workspace
// VERSION : 1.1.2 : DM : #5828 : 10/05/2017 : remove domain and session on window apply domain and session of view, page or workspace in case of wildcard
// END-HISTORY
// ====================================================================

import { PropTypes } from 'react';
import { connect } from 'react-redux';

import { getWindow, getWindows } from 'store/reducers/windows';
import { updateTitle } from 'store/actions/windows';
import EditWindowWrapper from './EditWindowWrapper';

const mapStateToProps = (state, { windowId }) => {
  const window = getWindow(state, { windowId });
  return {
    window,
    windows: getWindows(state),
  };
};

const mapDispatchToProps = { updateTitle };

const EditWindowContainer = connect(mapStateToProps, mapDispatchToProps)(EditWindowWrapper);

EditWindowContainer.propTypes = {
  windowId: PropTypes.string,
};

export default EditWindowContainer;
