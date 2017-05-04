import { PropTypes } from 'react';
import { connect } from 'react-redux';

import { getWindow, getWindows } from '../../store/reducers/windows';
import { updateTitle } from '../../store/actions/windows';
import EditWindowWrapper from './EditWindowWrapper';

const mapStateToProps = (state, { windowId }) => {
  const window = getWindow(state, { windowId });
  console.log(window);
  console.log(getWindows(state));
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
