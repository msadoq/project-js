import { connect } from 'react-redux';
import DynamicViewEntryPoints from 'viewManager/commonEditor/EntryPoint/DynamicViewEntryPoints';
import {
  getSelectedCatalogName,
  getSelectedDomainInForm,
  getSelectedItemName,
  getSelectedTimelineId,
} from '../Fields/selectors';

const mapStateToProps = (state, { form }) => ({
  selectedDomainName: getSelectedDomainInForm(form, state),
  selectedTimelineId: getSelectedTimelineId(form, state),
  selectedCatalogName: getSelectedCatalogName(form, state),
  selectedItemName: getSelectedItemName(form, state),
});

const DynamicViewEntryPointsContainer = connect(
  mapStateToProps, {}
)(DynamicViewEntryPoints);

export default DynamicViewEntryPointsContainer;
