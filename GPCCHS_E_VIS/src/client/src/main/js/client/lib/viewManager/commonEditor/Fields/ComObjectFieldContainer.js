import _ from 'lodash/fp';
import { connect } from 'react-redux';

import ComObjectField from './ComObjectField';

const mapStateToProps = (state, {
  name,
  comObjectName,
}) => ({
  comObjectFields: _.getOr([], ['comObjectMap', 'fields', comObjectName], state),
  name,
});

const ComObjectFieldContainer = connect(mapStateToProps)(ComObjectField);

export default ComObjectFieldContainer;
