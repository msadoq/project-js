// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #6785 : 31/05/2017 : Add Misc/links in view editor
// VERSION : 1.1.2 : DM : #6700 : 06/07/2017 : Split ui reducer + prepare ui/dialog reducer
// END-HISTORY
// ====================================================================

import { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { addLink, removeLink, updateLink } from 'store/actions/views';
import { updateViewSubPanels } from 'store/actions/ui';
import { getLinks } from 'store/reducers/views';
import { getViewSubPanels } from 'store/reducers/ui/editor';
import Links from './Links';


const mapStateToProps = createStructuredSelector({
  links: getLinks,
  panels: getViewSubPanels,
});

const mapDispatchToProps = {
  updateViewSubPanels,
  removeLink,
  updateLink,
  addLink,
};

const LinkContainer = connect(mapStateToProps, mapDispatchToProps)(Links);

LinkContainer.propTypes = {
  viewId: PropTypes.string.isRequired,
};

export default LinkContainer;
