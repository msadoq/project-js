import { connect } from 'react-redux';
import HistoryEntryPointConnectedDataFields from './HistoryEntryPointConnectedDataFields';
import {
  getSelectedCatalogName,
  getSelectedComObjectName,
  getSelectedDomainInForm,
  getSelectedItemName,
  getSelectedTimelineId,
} from '../../../commonEditor/Fields/selectors';
import { TIME_BASED_DATA_OPTION } from '../../../commonEditor/Fields/DataTypeField';

const mapStateToProps = (state, { form }) => ({
  selectedDomainName: getSelectedDomainInForm(form, state),
  selectedTimelineId: getSelectedTimelineId(form, state),
  selectedCatalogName: getSelectedCatalogName(form, state),
  selectedItemName: getSelectedItemName(form, state),
  selectedComObjectName: getSelectedComObjectName(form, state),
  dataType: TIME_BASED_DATA_OPTION.value,
  allowedComObjects: ['ReportingParameter', 'LogbookEvent', 'ComputedEvent', 'UserEvent', 'COP1Status'],
});

const HistoryEntryPointConnectedDataFieldsContainer = connect(
  mapStateToProps, {}
)(HistoryEntryPointConnectedDataFields);

export default HistoryEntryPointConnectedDataFieldsContainer;
