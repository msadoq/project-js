import { PropTypes } from 'react';
import { connect } from 'react-redux';
import Inspector from './Inspector';
import {
  getInspectorStaticDataLoading,
  getInspectorStaticData,
  getInspectorSessionId,
  getInspectorDomainId,
} from '../../../store/selectors/inspector';
import {
  isInspectorStaticDataNodeToggled as toggleNode,
} from '../../../store/actions/inspector';

const mapStateToProps = (state) => {
  const sessionId = getInspectorSessionId(state);
  const domainId = getInspectorDomainId(state);
  const data = getInspectorStaticData(state);
  const isLoading = getInspectorStaticDataLoading(state);
  return {
    sessionId,
    domainId,
    isLoading,
    data,
  };
};

const InspectorContainer = connect(mapStateToProps, { toggleNode })(Inspector);

InspectorContainer.props = {
  sessionId: PropTypes.number.isRequired,
  domainId: PropTypes.number.isRequired,
  isLoading: PropTypes.bool.isRequired,
  data: PropTypes.object,
  toggleNode: PropTypes.func.isRequired,
};

export default InspectorContainer;
