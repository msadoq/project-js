import { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators } from 'redux';

import DynamicView from './DynamicView';
import { getConfigurationByViewId } from '../../../../viewManager';
import { getViewEntryPoints } from '../../../../store/selectors/views';
import { isAnyInspectorOpened } from '../../../../store/selectors/pages';
import { getInspectorEpId } from '../../../../store/reducers/inspector';
import { getFormula } from './selectors';
import { getData } from '../../store/dataReducer';
import { getLinks } from '../../../../store/reducers/views';
import { removeLink } from '../../../../store/actions/views';

const mapStateToProps = createStructuredSelector({
  formula: getFormula,
  configuration: getConfigurationByViewId,
  entryPoints: getViewEntryPoints,
  data: getData,
  isInspectorOpened: isAnyInspectorOpened,
  inspectorEpId: getInspectorEpId,
  links: getLinks,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  removeLink,
}, dispatch);

const DynamicViewContainer = connect(mapStateToProps, mapDispatchToProps)(DynamicView);

DynamicViewContainer.propTypes = {
  viewId: PropTypes.string.isRequired,
};
export default DynamicViewContainer;
