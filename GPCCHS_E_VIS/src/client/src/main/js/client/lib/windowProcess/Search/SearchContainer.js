import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPanels } from 'store/reducers/pages';
import { getView } from 'store/reducers/views';
import Search from './Search';

const mapStateToProps = (state, { pageId }) => {
  const { searchViewId } = getPanels(state, { pageId });
  const view = getView(state, { viewId: searchViewId });
  return {
    pageId,
    viewId: searchViewId,
    type: view ? view.type : null,
  };
};

const SearchContainer = connect(mapStateToProps)(Search);

SearchContainer.propTypes = {
  pageId: PropTypes.string.isRequired,
};

export default SearchContainer;
