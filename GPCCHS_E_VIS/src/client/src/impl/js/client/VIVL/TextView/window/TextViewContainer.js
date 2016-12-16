import { PropTypes } from 'react';
import { connect } from 'react-redux';
import TextView from './TextView';
import {
  updateContent
} from '../../../lib/store/actions/views';

export const TextViewContainer = connect(null, {
  updateContent,
})(TextView);

TextViewContainer.propTypes = {
  viewId: PropTypes.string.isRequired
};
export default TextViewContainer;
