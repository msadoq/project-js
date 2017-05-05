import { PropTypes } from 'react';
import { connect } from 'react-redux';

import { getWindow, getWindows } from '../../store/reducers/windows';
import { updateTitle, updateDomainName, updateSessionName } from '../../store/actions/windows';
import EditWindowWrapper from './EditWindowWrapper';
import { getDomains } from '../../store/reducers/domains';
import { getSessions } from '../../store/reducers/sessions';

const mapStateToProps = (state, { windowId }) => {
  const window = getWindow(state, { windowId });
  return {
    window,
    windows: getWindows(state),
    domains: getDomains(state),
    sessions: getSessions(state),
  };
};

const mapDispatchToProps = { updateTitle, updateDomainName, updateSessionName };

const EditWindowContainer = connect(mapStateToProps, mapDispatchToProps)(EditWindowWrapper);

EditWindowContainer.propTypes = {
  windowId: PropTypes.string,
};

export default EditWindowContainer;
