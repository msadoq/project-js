import { connect } from 'react-redux';
import { getFieldsListByComObjectName } from 'store/reducers/comObjectMap';
import ComObjectFilterField from './ComObjectFilterField';
import {
  getSelectedCatalogName,
  getSelectedComObjectName,
  getSelectedDomainInForm,
  getSelectedItemName,
  getSelectedTimelineId,
} from './selectors';

const mapStateToProps = (state, { formName }) => {
  const comObjectName = getSelectedComObjectName(formName, state);
  return {
    domainName: getSelectedDomainInForm(formName, state),
    timelineId: getSelectedTimelineId(formName, state),
    catalogName: getSelectedCatalogName(formName, state),
    itemName: getSelectedItemName(formName, state),
    comObjectName,
    comObjectFields: getFieldsListByComObjectName(state, comObjectName),
  };
};

const ComObjectFilterFieldContainer = connect(mapStateToProps, {})(ComObjectFilterField);

export default ComObjectFilterFieldContainer;
