import { PropTypes } from 'react';
import { connect } from 'react-redux';
import TextView from './TextView';
import { addEntryPoint } from '../../../lib/store/actions/views';
import {
  updateContent,
  getViewContent,
  getTextViewData,
  getViewEntryPoints,
} from '../../../lib/store/selectors/views';

export const TextViewContainer = connect(
  (state, { viewId }) => ({
    entryPoints: getViewEntryPoints(state, viewId),
    content: getViewContent(state, viewId),
    data: getTextViewData(state, viewId),
  }), {
    updateContent,
    addEntryPoint,
  }
)(TextView);

TextViewContainer.propTypes = {
  viewId: PropTypes.string.isRequired
};
export default TextViewContainer;
