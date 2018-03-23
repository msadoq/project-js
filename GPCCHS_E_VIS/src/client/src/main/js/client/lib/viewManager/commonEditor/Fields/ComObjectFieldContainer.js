import { connect } from 'react-redux';
import { getFieldsListByComObjectName } from 'store/reducers/comObjectMap';
import ComObjectField from './ComObjectField';

const mapStateToProps = (state, { comObjectName }) => ({
  comObjectFields: getFieldsListByComObjectName(state, comObjectName),
  formFieldName: 'connectedData.comObjectField',
});

const ComObjectFieldContainer = connect(mapStateToProps, {})(ComObjectField);

export default ComObjectFieldContainer;
