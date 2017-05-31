import { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators } from 'redux';

import { getConfigurationByViewId } from '../../../../viewManager';
import { getViewContent } from '../../store/configurationSelectors';
import MimicView from './MimicView';
import { getViewEntryPoints } from '../../../../store/selectors/views';
import { getData } from '../../store/dataReducer';
import { getLinks } from '../../../../store/reducers/views';
import { removeLink } from '../../../../store/actions/views';

const mapStateToProps = createStructuredSelector({
  content: getViewContent,
  configuration: getConfigurationByViewId,
  entryPoints: getViewEntryPoints,
  data: getData,
  links: getLinks,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  removeLink,
}, dispatch);

const MimicViewContainer = connect(mapStateToProps, mapDispatchToProps)(MimicView);

MimicViewContainer.propTypes = {
  viewId: PropTypes.string.isRequired,
};

export default MimicViewContainer;
