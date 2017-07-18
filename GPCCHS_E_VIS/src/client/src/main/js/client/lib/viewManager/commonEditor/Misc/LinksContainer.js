import { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Links from './Links';
import { addLink, removeLink, updateLink } from '../../../store/actions/views';
import { updateViewSubPanels } from '../../../store/actions/ui';
import { getLinks } from '../../../store/reducers/views';
import { getViewSubPanels } from '../../../store/reducers/ui/editor';


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
