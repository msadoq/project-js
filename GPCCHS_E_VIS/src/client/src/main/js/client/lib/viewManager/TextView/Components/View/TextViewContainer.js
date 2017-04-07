import { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import TextView from './TextView';
import {
  addEntryPoint,
  updateContent,
  updateEditorSearch,
} from '../../../../store/actions/views';
import { getViewEntryPoints } from '../../../../store/selectors/views';
import { getConfigurationByViewId } from '../../../../viewManager';
import { getData } from '../../store/dataReducer';
import { getViewContent } from '../../store/configurationSelectors';

const mapStateToProps = createStructuredSelector({
  content: getViewContent,
  configuration: getConfigurationByViewId,
  entryPoints: getViewEntryPoints,
  data: getData,
});

const mapDispatchToProps = (dispatch, { viewId }) => bindActionCreators({
  updateContent: html => updateContent(viewId, html),
  addEntryPoint: data => addEntryPoint(viewId, data),
  updateEditorSearch: pattern => updateEditorSearch(viewId, pattern),
}, dispatch);

const TextViewContainer = connect(mapStateToProps, mapDispatchToProps)(TextView);

TextViewContainer.propTypes = {
  viewId: PropTypes.string.isRequired,
};

export default TextViewContainer;
