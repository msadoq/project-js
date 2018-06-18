import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getSearchingByPage, getSearchViewsIds, getPageTitle, getSearchCount, computeSearhCount } from 'store/reducers/pages/index';
import TextSearch from 'windowProcess/Search/Component/SearchComponent';
import { getViewTitle } from 'store/reducers/views';
import { closeSearch, searchInPage, resetSearchInPage } from '../../../store/actions/pages';

const mapStateToProps = () => (state, { pageId }) => {
  const searching = getSearchingByPage(state, { pageId });
  const searchViewsIds = getSearchViewsIds(state, { pageId });
  const searchCount = computeSearhCount(getSearchCount(state, { pageId }));

  let title;
  if (searchViewsIds.length > 1) {
    title = getPageTitle(state, { pageId });
  } else {
    const viewId = searchViewsIds[0];
    title = getViewTitle(state, { viewId });
  }

  return {
    searchCount,
    searching,
    title,
  };
};

const mapDispatchToProps = (dispatch, { pageId, viewId }) => bindActionCreators({
  closeSearch: () => closeSearch(pageId, viewId),
  searchInPage,
  resetSearchInPage,
}, dispatch);

const SearchComponentContainer = connect(mapStateToProps, mapDispatchToProps)(TextSearch);

SearchComponentContainer.propTypes = {
  viewsIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  pageId: PropTypes.string.isRequired,
};

export default SearchComponentContainer;
