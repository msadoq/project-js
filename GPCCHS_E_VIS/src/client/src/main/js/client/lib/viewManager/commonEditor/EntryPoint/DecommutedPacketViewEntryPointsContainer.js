import { connect } from 'react-redux';
import DecommutedPacketViewEntryPoints
  from 'viewManager/commonEditor/EntryPoint/DecommutedPacketViewEntryPoints';
import { getViewDomainName, getViewSessionName } from 'store/reducers/views';
import { getDomainByNameWithFallback } from 'store/reducers/domains';
import {
  getSelectedCatalogName,
} from '../Fields/selectors';

const mapStateToProps = (state, { form, viewId, pageId }) => {
  const domainName = getViewDomainName(state, { viewId });
  const domain = getDomainByNameWithFallback(state, { domainName, viewId, pageId });
  return {
    domainName: domain.name,
    sessionName: getViewSessionName(state, { viewId }),
    selectedCatalogName: getSelectedCatalogName(form, state),
  };
};

const DecommutedPacketViewEntryPointsContainer = connect(
  mapStateToProps, {}
)(DecommutedPacketViewEntryPoints);

export default DecommutedPacketViewEntryPointsContainer;
