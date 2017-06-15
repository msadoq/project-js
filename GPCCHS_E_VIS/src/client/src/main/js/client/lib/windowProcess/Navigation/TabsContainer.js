import { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getWindowPages } from '../../store/selectors/windows';
import { focusPage, moveTabOrder } from '../../store/actions/windows';
import { closePage } from '../../store/actions/pages';
import Tabs from './Tabs';
import { open as openModal, close as closeModal } from '../../store/actions/modals';
import { getPageModifiedViewsIds } from '../../mainProcess/menuManager/selectors';
import { getWindowFocusedPageId } from '../../store/reducers/windows';


const mapStateToStore = (state, { windowId }) => {
  const pageId = getWindowFocusedPageId(state, { windowId });
  return {
    pages: getWindowPages(state, { windowId }),
    modifiedViewNb: getPageModifiedViewsIds(state, { pageId }).length,
  };
};

function mapDispatchToProps(dispatch, { windowId }) {
  return bindActionCreators({
    focusPage: pageId => focusPage(windowId, pageId),
    closePage: pageId => closePage(windowId, pageId),
    moveTabOrder: (keyFrom, keyTarget) => moveTabOrder(windowId, keyFrom, keyTarget),
    openModal: args => openModal(windowId, { windowId, ...args }),
    closeModal: () => closeModal(windowId),
  }, dispatch);
}

const TabsContainer = connect(mapStateToStore, mapDispatchToProps)(Tabs);

TabsContainer.propTypes = {
  windowId: PropTypes.string.isRequired,
};

export default TabsContainer;
