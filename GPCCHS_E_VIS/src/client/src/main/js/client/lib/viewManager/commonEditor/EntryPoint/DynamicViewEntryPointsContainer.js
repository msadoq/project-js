import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';
import DynamicViewEntryPoints from 'viewManager/commonEditor/EntryPoint/DynamicViewEntryPoints';

const mapStateToProps = (state, props) => (
  {
    selectedDomainName: formValueSelector(props.form)(state, 'domain'),
    selectedTimelineId: formValueSelector(props.form)(state, 'timeline'),
    selectedCatalogName: formValueSelector(props.form)(state, 'catalog'),
    selectedItemName: formValueSelector(props.form)(state, 'catalogItem'),
  }
);

const DynamicViewEntryPointsContainer = connect(
  mapStateToProps, {}
)(DynamicViewEntryPoints);

export default DynamicViewEntryPointsContainer;
