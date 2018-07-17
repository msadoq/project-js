// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #6829 : 27/06/2017 : PlotView legend : left right top bottom.
// VERSION : 2.0.0 : DM : #5806 : 06/12/2017 : Change all relative imports .
// VERSION : 2.0.0.3 : FA : ISIS-FT-3174 : 30/05/2018 : disable background color on view header for
//  multisat handle
// END-HISTORY
// ====================================================================

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getView } from 'store/reducers/views';
import { getConfigurationByViewId } from 'viewManager/selectors';
import { getDomains } from 'store/reducers/domains';
import { getSessions } from 'store/reducers/sessions';
import { updateTitle,
  updateLegend,
  toggleLegend,
  updateTitleStyle,
  updateDomainName,
  updateSessionName,
} from 'store/actions/views';
import ViewParams from './ViewParams';

const mapStateToProps = (state, { viewId }) => {
  const view = getView(state, { viewId });
  const configuration = getConfigurationByViewId(state, { viewId });
  return {
    showLegend: configuration.showLegend,
    legend: configuration.legend,
    backgroundColor: view.backgroundColor,
    title: view.title,
    titleStyle: view.titleStyle,
    links: view.links,
    defaultRatio: view.defaultRatio,
    domains: getDomains(state),
    sessions: getSessions(state),
    domainName: view.domainName,
    sessionName: view.sessionName,
  };
};

const ViewParamsContainer = connect(mapStateToProps, {
  updateTitle,
  updateTitleStyle,
  updateDomainName,
  updateSessionName,
  updateLegend,
  toggleLegend,
})(ViewParams);

ViewParamsContainer.propTypes = {
  viewId: PropTypes.string.isRequired,
};

export default ViewParamsContainer;
