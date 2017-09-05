import { connect } from 'react-redux';
import { PropTypes } from 'react';
import Links from './Links';
import { getPages } from '../../store/reducers/pages';
import { getViews } from '../../store/reducers/views';
import { focusPage } from '../../store/actions/pages';
import { focusView } from '../../store/actions/views';
import { askOpenLink } from '../../store/actions/links';
import { getWindowIdByPageId } from '../../store/reducers/windows';

const mapStateToProps = (state, { pageId }) => ({
  pages: getPages(state),
  views: getViews(state),
  windowId: getWindowIdByPageId(state, { pageId }),
});

const mapDispatchToProps = {
  focusPage,
  focusView,
  askOpenLink,
};

const LinksContainer = connect(mapStateToProps, mapDispatchToProps)(Links);

LinksContainer.props = {
  show: PropTypes.bool.isRequired,
  toggleShowLinks: PropTypes.func.isRequired,
  removeLink: PropTypes.func.isRequired,
  links: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
  })),
  pageId: PropTypes.string.isRequired,
  viewId: PropTypes.string.isRequired,
};

export default LinksContainer;
