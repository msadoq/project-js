import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { closePage } from '../../store/actions/pages';
import { close as closeModal, open as openModal } from '../../store/actions/modals';

import UnsavedViewWarning from './UnsavedViewWarning';

const mapDispatchToProps = (dispatch, { pageId, windowId }) => bindActionCreators({
  closePage: () => closePage(windowId, pageId),
  closeModal: () => closeModal(windowId),
  openModal: args => openModal(windowId, { windowId, pageId, ...args }),
}, dispatch);

const UnsavedViewWarningContainer = connect(null, mapDispatchToProps)(UnsavedViewWarning);

export default UnsavedViewWarningContainer;
