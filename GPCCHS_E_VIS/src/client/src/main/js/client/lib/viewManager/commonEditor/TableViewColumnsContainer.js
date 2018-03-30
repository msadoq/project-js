import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getViewConfigurationTableCols } from 'store/selectors/views';
import TableViewColumns from './TableViewColumns';

const mapStateToProps = (state, { viewId }) => ({
  cols: getViewConfigurationTableCols(state, { viewId }),
});

const TableViewColumnsContainer = connect(mapStateToProps, {})(TableViewColumns);

TableViewColumnsContainer.propTypes = {
  viewId: PropTypes.string.isRequired,
};

export default TableViewColumnsContainer;
