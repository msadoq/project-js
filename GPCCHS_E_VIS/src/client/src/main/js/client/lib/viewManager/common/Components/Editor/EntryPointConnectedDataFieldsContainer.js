import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';
import EntryPointConnectedDataFields from 'viewManager/common/Components/Editor/EntryPointConnectedDataFields';

const mapStateToProps = (state, props) => ({
  selectedDomainName: formValueSelector(props.form)(state, 'connectedData.domain'),
  selectedTimelineId: formValueSelector(props.form)(state, 'connectedData.timeline'),
  selectedCatalogName: formValueSelector(props.form)(state, 'catalog'),
  selectedItemName: formValueSelector(props.form)(state, 'catalogItem'),
  selectedComObjectName: formValueSelector(props.form)(state, 'comObject'),
});

const EntryPointConnectedDataFieldsContainer = connect(
  mapStateToProps, {}
)(EntryPointConnectedDataFields);

export default EntryPointConnectedDataFieldsContainer;
