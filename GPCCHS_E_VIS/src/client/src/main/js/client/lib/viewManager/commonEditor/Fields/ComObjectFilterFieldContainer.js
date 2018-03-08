import { connect } from 'react-redux';
import { getFieldsListByComObjectName } from 'store/reducers/comObjectMap';
import { formValueSelector } from 'redux-form';
import ComObjectFilterField from './ComObjectFilterField';

const mapStateToProps = (state, { formName }) => {
  const comObjectName = formValueSelector(formName)(state, 'comObject');
  return {
    domainName: formValueSelector(formName)(state, 'connectedData.domain'),
    timelineId: formValueSelector(formName)(state, 'connectedData.timeline'),
    catalogName: formValueSelector(formName)(state, 'catalog'),
    itemName: formValueSelector(formName)(state, 'catalogItem'),
    comObjectName,
    comObjectFields: getFieldsListByComObjectName(state, comObjectName),
  };
};

const ComObjectFilterFieldContainer = connect(mapStateToProps, {})(ComObjectFilterField);

export default ComObjectFilterFieldContainer;
