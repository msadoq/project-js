import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateTableCols } from 'store/actions/views';
import { updateViewPanels } from 'store/actions/ui';
import { createStructuredSelector } from 'reselect';
import GroundAlarmTab from './GroundAlarmTab';
import { getConfigurationByViewId } from '../../../index';

const mapStateToProps = createStructuredSelector({
  configuration: getConfigurationByViewId,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  updateTableCols,
  updateViewPanels,
}, dispatch);

const GroundAlarmTabContainer = connect(mapStateToProps, mapDispatchToProps)(GroundAlarmTab);

export default GroundAlarmTabContainer;
