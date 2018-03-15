import { connect } from 'react-redux';
import { getFieldsListByComObjectName } from 'store/reducers/comObjectMap';
import FiltersFields from './FiltersFields';
import { getSelectedComObjectName } from './selectors';

const mapStateToProps = (state, { form }) => {
  const comObjectName = getSelectedComObjectName(form, state);
  return {
    comObjectFields: getFieldsListByComObjectName(state, comObjectName),
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(FiltersFields);
