import { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getWindowPages } from 'store/selectors/windows';
import { focusPage, moveTabOrder, movePageToWindow } from 'store/actions/windows';
import { askClosePage } from 'store/actions/pages';
import { close as closeModal } from 'store/actions/modals';
import Tabs from './Tabs';

const mapStateToProps = (state, { windowId }) => ({
  pages: getWindowPages(state, { windowId }),
});

function mapDispatchToProps(dispatch, { windowId }) {
  return bindActionCreators({
    askClosePage,
    movePageToWindow: pageId => movePageToWindow(pageId, windowId),
    focusPage: pageId => focusPage(windowId, pageId),
    moveTabOrder: (keyFrom, keyTarget) => moveTabOrder(windowId, keyFrom, keyTarget),
    closeModal: () => closeModal(windowId),
  }, dispatch);
}

const TabsContainer = connect(mapStateToProps, mapDispatchToProps)(Tabs);
const { string } = PropTypes;

TabsContainer.propTypes = {
  windowId: string.isRequired,
};

export default TabsContainer;
