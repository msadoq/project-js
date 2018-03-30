
import React from 'react';
import PropTypes from 'prop-types';

import classnames from 'classnames';

import './GroupTable.scss';

import Arrow from './Arrow';


const colsType =
  PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      sort: PropTypes.oneOf('ASC', 'DESC'),
    })
  );

const rowDataType =
  PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]);

const dataType = PropTypes.arrayOf(rowDataType);

const GroupTableHeader = ({ title, colsNumber }) => (
  <tr>
    <th colSpan={colsNumber}>{ title }</th>
  </tr>
);

GroupTableHeader.propTypes = {
  title: PropTypes.string.isRequired,
  colsNumber: PropTypes.number.isRequired,
};

const GroupTableSearchColumns = ({ cols }) => // TODO: set searchCols in container state
// eslint-disable-next-line no-unused-vars
  <tr>{ cols.map(col => <td><input type={'text'} value={col.value} /></td>) }</tr>;

GroupTableSearchColumns.propTypes = {
  cols: colsType.isRequired,
};

const GroupTableColumnsHeaders = ({ cols }) =>
  <tr>
    {
      cols.map(
        col =>
          <th>{ col.title } {col.sort} <Arrow mode={col.sort} /> </th>
      )
    }
  </tr>;

GroupTableColumnsHeaders.propTypes = {
  cols: colsType.isRequired,
};

const GroupTableRow = ({ rowData, outlined }) =>
  <tr className={classnames({ currentRow: outlined })}>
    {rowData.map(col => <td>{ col }</td>)}
  </tr>;

GroupTableRow.propTypes = {
  rowData: rowDataType.isRequired,
  outlined: PropTypes.bool,
};

GroupTableRow.defaultProps = {
  outlined: false,
};

/**
 * GroupTable is a stateless component for displaying a group of data
 *
 * @param title string the title of the group table
 * @param cols array containing the metadata of the displayed column headers
 * @param data array of arrays containing the displayed data
 * @returns {*}
 * @constructor
 */
const GroupTable = ({ title, cols, data, outlinedIndex }) => (
  <div className={'GroupTable'}>
    <table>
      <GroupTableHeader title={title} colsNumber={cols.length} />
      <GroupTableSearchColumns cols={cols} />
      <GroupTableColumnsHeaders cols={cols} />
      {
        data.map(
          (rowData, rowIndex) =>
            <GroupTableRow
              rowData={rowData}
              outlined={rowIndex === outlinedIndex}
            />
        )
      }
    </table>
  </div>
);

GroupTable.propTypes = {
  title: PropTypes.string.isRequired,
  cols: colsType.isRequired,
  data: dataType.isRequired,
  outlinedIndex: PropTypes.number,
};

GroupTable.defaultProps = {
  outlinedIndex: -1,
};

export default GroupTable;
