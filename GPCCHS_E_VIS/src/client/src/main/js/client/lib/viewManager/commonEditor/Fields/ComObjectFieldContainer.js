import { connect } from 'react-redux';
import { getFieldsListByComObjectName } from 'store/reducers/comObjectMap';
import ComObjectField from './ComObjectField';

const mapStateToProps = (state, { comObjectName, name }) => ({
  comObjectFields: getFieldsListByComObjectName(state, comObjectName),
  name,
});

const ComObjectFieldContainer = connect(mapStateToProps, {})(ComObjectField);

export default ComObjectFieldContainer;
