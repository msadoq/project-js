import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateTableCols } from 'store/actions/views';
import { updateViewPanels } from 'store/actions/ui';
import { createStructuredSelector } from 'reselect';
import PUS05Tab from './PUS05Tab';
import { getConfigurationByViewId } from '../../../index';

const mapStateToProps = createStructuredSelector({
  configuration: getConfigurationByViewId,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  updateTableCols,
  updateViewPanels,
}, dispatch);

const PUS05TabContainer = connect(mapStateToProps, mapDispatchToProps)(PUS05Tab);

export default PUS05TabContainer;
