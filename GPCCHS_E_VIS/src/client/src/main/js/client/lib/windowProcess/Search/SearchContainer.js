import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPanels } from 'store/reducers/pages';
import Search from './Search';

const mapStateToProps = (state, { pageId }) => {
  const { searchViewsIds } = getPanels(state, { pageId });
  return {
    pageId,
    searchViewsIds,
  };
};

const SearchContainer = connect(mapStateToProps)(Search);

SearchContainer.propTypes = {
  pageId: PropTypes.string.isRequired,
};

export default SearchContainer;
