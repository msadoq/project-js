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
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { toggleSamplingStatus } from 'store/actions/sampling';
import { getViewSampling } from 'store/reducers/views';
import SamplingButton from './SamplingButton';

const mapStateToProps = createStructuredSelector({
  sampling: getViewSampling,
});

const mapDispatchToProps = dispatch => ({
  toggleSamplingStatus: (viewId) => {
    dispatch(toggleSamplingStatus(viewId));
  },
});

const SamplingButtonContainer = connect(mapStateToProps, mapDispatchToProps)(SamplingButton);

SamplingButtonContainer.props = {
  pageId: PropTypes.string.isRequired,
  viewId: PropTypes.string.isRequired,
};

export default SamplingButtonContainer;
