import { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import TextView from './TextView';
import {
  addEntryPoint,
  updateContent,
} from '../../../../store/actions/views';
import {
  openEditor,
} from '../../../../store/actions/pages';
import { getViewEntryPoints } from '../../../../store/selectors/views';
import { getViewContent, getViewConfiguration } from '../../../../store/reducers/views';
import { getData } from '../../store/dataReducer';

const mapStateToProps = createStructuredSelector({
  content: getViewContent,
  configuration: getViewConfiguration,
  entryPoints: getViewEntryPoints,
  data: getData,
});

const mapDispatchToProps = (dispatch, { viewId }) => bindActionCreators({
  updateContent: html => updateContent(viewId, html),
  addEntryPoint: data => addEntryPoint(viewId, data),
  openEditor: () => openEditor(undefined, viewId),
}, dispatch);

export const TextViewContainer = connect(mapStateToProps, mapDispatchToProps)(TextView);

TextViewContainer.propTypes = {
  viewId: PropTypes.string.isRequired,
};

export default TextViewContainer;
