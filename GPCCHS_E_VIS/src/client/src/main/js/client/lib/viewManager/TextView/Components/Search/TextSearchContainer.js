import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getSearchCount } from 'store/reducers/pages';
import TextSearch from 'viewManager/TextView/Components/Search/TextSearch';
import { closeSearch } from '../../../../store/actions/pages';
import { searchInView, resetSearchInView } from '../../../../store/actions/views';
import { getSearchingByView } from '../../../../store/reducers/views';

const mapStateToProps = () => (state, { pageId, viewId }) => {
  const searchCount = getSearchCount(state, { pageId });
  const searching = getSearchingByView(state, { viewId });
  return {
    searchCount,
    searching,
  };
};

const mapDispatchToProps = (dispatch, { pageId, viewId }) => bindActionCreators({
  closeSearch: () => closeSearch(pageId, viewId),
  searchInView,
  resetSearchInView,
}, dispatch);

const TextSearchContainer = connect(mapStateToProps, mapDispatchToProps)(TextSearch);

TextSearchContainer.propTypes = {
  viewId: PropTypes.string.isRequired,
  pageId: PropTypes.string.isRequired,
};

export default TextSearchContainer;
