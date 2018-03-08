import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';
import { getFieldsListByComObjectName } from 'store/reducers/comObjectMap';
import FiltersFields from './FiltersFields';

const mapStateToProps = (state, { form }) => {
  const comObjectName = formValueSelector(form)(state, 'comObject');
  return {
    comObjectFields: getFieldsListByComObjectName(state, comObjectName),
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(FiltersFields);
