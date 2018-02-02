import { connect } from 'react-redux';
import ProviderField from 'viewManager/commonEditor/Fields/ProviderField';

const PROVIDER_HKTMR = 'HKTMR';
const PROVIDER_HKTMP = 'HKTMP';

const mapStateToProps = () => ({
  providers: [
    { name: PROVIDER_HKTMR },
    { name: PROVIDER_HKTMP },
  ],
});

const ProviderFieldContainer = connect(mapStateToProps, {})(ProviderField);

export default ProviderFieldContainer;
