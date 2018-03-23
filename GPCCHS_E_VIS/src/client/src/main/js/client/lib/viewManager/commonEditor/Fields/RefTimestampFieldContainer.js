import { connect } from 'react-redux';
import { getTimeFieldsByComObjectName } from 'store/reducers/comObjectMap';
import ComObjectField from './ComObjectField';

const mapStateToProps = (state, { comObjectName }) => ({
  comObjectFields: getTimeFieldsByComObjectName(state, comObjectName),
  formFieldName: 'connectedData.refTimestamp',
});

export default connect(mapStateToProps)(ComObjectField);
