import { PropTypes } from 'react';
import { connect } from 'react-redux';
import ViewParams from './ViewParams';
import { getView } from '../../store/reducers/views';
import { getDomains } from '../../store/reducers/domains';
import { getSessions } from '../../store/reducers/sessions';
import {
  updateBgColor,
  updateTitle,
  updateTitleStyle,
  updateDomainName,
  updateSessionName,
} from '../../store/actions/views';

const mapStateToProps = (state, { viewId }) => {
  const view = getView(state, { viewId });
  return {
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
  updateBgColor,
  updateTitle,
  updateTitleStyle,
  updateDomainName,
  updateSessionName,
})(ViewParams);

ViewParamsContainer.propTypes = {
  viewId: PropTypes.string.isRequired,
};

export default ViewParamsContainer;
