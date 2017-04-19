import { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getWindowPages } from '../../store/selectors/windows';
import { focusPage, moveTabOrder } from '../../store/actions/windows';
import { closePage } from '../../store/actions/pages';
import { open as openModal } from '../../store/actions/modals';
import Tabs from './Tabs';

const mapStateToStore = (state, { windowId }) => ({
  pages: getWindowPages(state, { windowId }),
});

function mapDispatchToProps(dispatch, { windowId }) {
  return bindActionCreators({
    focusPage: pageId => focusPage(windowId, pageId),
    closePage: pageId => closePage(windowId, pageId),
    openModal,
    moveTabOrder: (keyFrom, keyTarget) => moveTabOrder(windowId, keyFrom, keyTarget),
  }, dispatch);
}

const TabsContainer = connect(mapStateToStore, mapDispatchToProps)(Tabs);

TabsContainer.propTypes = {
  windowId: PropTypes.string.isRequired,
};

export default TabsContainer;
