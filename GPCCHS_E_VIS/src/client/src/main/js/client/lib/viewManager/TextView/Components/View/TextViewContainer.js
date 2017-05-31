import { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import TextView from './TextView';
import {
  addEntryPoint,
  updateContent,
  removeLink,
} from '../../../../store/actions/views';
import { getViewEntryPoints } from '../../../../store/selectors/views';
import { getConfigurationByViewId } from '../../../../viewManager';
import { isAnyInspectorOpened } from '../../../../store/selectors/pages';
import { getInspectorEpId } from '../../../../store/reducers/inspector';
import { getData } from '../../store/dataReducer';
import { getViewContent } from '../../store/configurationSelectors';
import { getLinks } from '../../../../store/reducers/views';

const mapStateToProps = createStructuredSelector({
  content: getViewContent,
  configuration: getConfigurationByViewId,
  entryPoints: getViewEntryPoints,
  data: getData,
  isInspectorOpened: isAnyInspectorOpened,
  inspectorEpId: getInspectorEpId,
  links: getLinks,
});

const mapDispatchToProps = (dispatch, { viewId }) => bindActionCreators({
  updateContent: html => updateContent(viewId, html),
  addEntryPoint: data => addEntryPoint(viewId, data),
  removeLink: key => removeLink(viewId, key),
}, dispatch);

const TextViewContainer = connect(mapStateToProps, mapDispatchToProps)(TextView);

TextViewContainer.propTypes = {
  viewId: PropTypes.string.isRequired,
};

export default TextViewContainer;
