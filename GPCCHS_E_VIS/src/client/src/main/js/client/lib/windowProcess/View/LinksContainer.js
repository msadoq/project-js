// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #6785 : 12/06/2017 : activate links in views .
// VERSION : 1.1.2 : DM : #6785 : 13/06/2017 : read link defined with absolute path, FMD path or OID
// VERSION : 1.1.2 : DM : #6785 : 29/06/2017 : Fix opening view link in a new page and read only path for link definition
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 20/07/2017 : Reimplement openLink middleware . .
// VERSION : 1.1.2 : DM : #6700 : 03/08/2017 : Merge branch 'dev' into dbrugne-data
// VERSION : 1.1.2 : FA : ISIS-FT-2138 : 01/09/2017 : Added error message when dropped item's mime type is not supported.
// END-HISTORY
// ====================================================================

import { connect } from 'react-redux';
import { PropTypes } from 'react';
import { getPages } from 'store/reducers/pages';
import { getViews } from 'store/reducers/views';
import { focusPage } from 'store/actions/pages';
import { focusView } from 'store/actions/views';
import { askOpenLink } from 'store/actions/links';
import { getWindowIdByPageId } from 'store/reducers/windows';
import Links from './Links';

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
