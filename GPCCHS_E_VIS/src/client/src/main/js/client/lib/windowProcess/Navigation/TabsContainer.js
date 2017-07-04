import { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getWindowPages } from '../../store/selectors/windows';
import { focusPage, moveTabOrder } from '../../store/actions/windows';
import { askClosePage } from '../../store/actions/pages';
import Tabs from './Tabs';
import { close as closeModal } from '../../store/actions/modals';


const mapStateToProps = (state, { windowId }) => ({
  pages: getWindowPages(state, { windowId }),
});

function mapDispatchToProps(dispatch, { windowId }) {
  return bindActionCreators({
    askClosePage,
    focusPage: pageId => focusPage(windowId, pageId),
    moveTabOrder: (keyFrom, keyTarget) => moveTabOrder(windowId, keyFrom, keyTarget),
    closeModal: () => closeModal(windowId),
  }, dispatch);
}

const TabsContainer = connect(mapStateToProps, mapDispatchToProps)(Tabs);

TabsContainer.propTypes = {
  windowId: PropTypes.string.isRequired,
};

export default TabsContainer;
