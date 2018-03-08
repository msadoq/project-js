import { connect } from 'react-redux';
import ProviderField from 'viewManager/commonEditor/Fields/ProviderField';
import { PROVIDER_FLOW_HKTMR, PROVIDER_FLOW_HKTMP /* , PROVIDER_FLOW_ALL */ } from '../../../constants';

const mapStateToProps = () => ({
  providers: [
    { name: PROVIDER_FLOW_HKTMR },
    { name: PROVIDER_FLOW_HKTMP },
    // { name: PROVIDER_FLOW_ALL }, // @todo uncomment
  ],
});

const ProviderFieldContainer = connect(mapStateToProps, {})(ProviderField);

export default ProviderFieldContainer;
