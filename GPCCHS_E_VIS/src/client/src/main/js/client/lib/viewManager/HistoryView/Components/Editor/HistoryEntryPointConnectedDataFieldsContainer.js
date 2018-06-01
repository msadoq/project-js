import { connect } from 'react-redux';
import HistoryEntryPointConnectedDataFields from './HistoryEntryPointConnectedDataFields';
import {
  getSelectedCatalogName,
  getSelectedComObjectName,
  getSelectedDomainInForm,
  getSelectedItemName,
  getSelectedTimelineId,
} from '../../../commonEditor/Fields/selectors';

const mapStateToProps = (state, { form }) => ({
  selectedDomainName: getSelectedDomainInForm(form, state),
  selectedTimelineId: getSelectedTimelineId(form, state),
  selectedCatalogName: getSelectedCatalogName(form, state),
  selectedItemName: getSelectedItemName(form, state),
  selectedComObjectName: getSelectedComObjectName(form, state),
});

const HistoryEntryPointConnectedDataFieldsContainer = connect(
  mapStateToProps, {}
)(HistoryEntryPointConnectedDataFields);

export default HistoryEntryPointConnectedDataFieldsContainer;
