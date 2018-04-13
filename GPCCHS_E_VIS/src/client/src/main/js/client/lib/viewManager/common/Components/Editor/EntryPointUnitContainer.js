
import { connect } from 'react-redux';

import { formValueSelector } from 'redux-form';
import { askUnit } from 'store/actions/catalogs';
import getUnitParams from 'viewManager/commonData/getUnitParams';

import EntryPointUnit from 'viewManager/common/Components/Editor/EntryPointUnit';

const mapStateToProps = (state, props) => ({
  convertFrom: formValueSelector(props.form)(state, 'convertFrom'),
  convertTo: formValueSelector(props.form)(state, 'convertTo'),
  ...getUnitParams(state, props),
});

const mapDispatchToProps = dispatch => ({
  askUnit: (domainId, sessionId, catalog, catalogItem) => {
    dispatch(askUnit(domainId, sessionId, catalog, catalogItem));
  },
});

const EntryPointUnitContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EntryPointUnit);

export default EntryPointUnitContainer;
