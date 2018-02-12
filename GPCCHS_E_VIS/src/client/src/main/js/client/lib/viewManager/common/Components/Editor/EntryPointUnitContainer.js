import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';
import EntryPointUnit from 'viewManager/common/Components/Editor/EntryPointUnit';

const mapStateToProps = (state, props) => (
  {
    convertFrom: formValueSelector(props.form)(state, 'convertFrom'),
    convertTo: formValueSelector(props.form)(state, 'convertTo'),
  }
);

const EntryPointUnitContainer = connect(
  mapStateToProps, {}
)(EntryPointUnit);

export default EntryPointUnitContainer;
