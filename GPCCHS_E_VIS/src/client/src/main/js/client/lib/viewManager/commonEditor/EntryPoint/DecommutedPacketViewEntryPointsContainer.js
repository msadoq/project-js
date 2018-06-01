import { connect } from 'react-redux';
import DecommutedPacketViewEntryPoints
  from 'viewManager/commonEditor/EntryPoint/DecommutedPacketViewEntryPoints';
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

const DecommutedPacketViewEntryPointsContainer = connect(
  mapStateToProps, {}
)(DecommutedPacketViewEntryPoints);

export default DecommutedPacketViewEntryPointsContainer;
