import { connect } from 'react-redux';
import DataViewEntryPoints from 'viewManager/commonEditor/EntryPoint/DataViewEntryPoints';
import PropTypes from 'prop-types';

const mapStateToProps = () => ({});

const DataViewEntryPointsContainer = connect(
  mapStateToProps, {}
)(DataViewEntryPoints);

DataViewEntryPointsContainer.PropTypes = {
  viewId: PropTypes.string.isRequired,
  pageId: PropTypes.string.isRequired,
  search: PropTypes.string,
  viewType: PropTypes.oneOf(['TextView', 'MimicView', 'HistoryView', 'PlotView']).isRequired,
};


export default DataViewEntryPointsContainer;
