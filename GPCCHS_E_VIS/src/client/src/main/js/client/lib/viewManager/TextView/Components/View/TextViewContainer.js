import _ from 'lodash/fp';
import { PropTypes } from 'react';
import { connect } from 'react-redux';
import TextView from './TextView';
import {
  addEntryPoint,
  updateContent,
} from '../../../../store/actions/views';
import {
  getViewContent,
  getViewEntryPoints,
} from '../../../../store/selectors/views';

const mapStateToProps = (state, { viewId }) => {
  const getConfiguration = _.get(`views[${viewId}].configuration`);
  return {
    content: getViewContent(state, { viewId }),
    configuration: getConfiguration(state),
    entryPoints: getViewEntryPoints(state, { viewId }),
  };
};

const mapDispatchToProps = {
  updateContent,
  addEntryPoint,
};

export const TextViewContainer = connect(mapStateToProps, mapDispatchToProps)(TextView);

TextViewContainer.propTypes = {
  viewId: PropTypes.string.isRequired,
};
export default TextViewContainer;
