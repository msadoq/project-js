import React from 'react';
import PropTypes from 'prop-types';

const styles = {
  row: {
    paddingLeft: '10px',
  },
  entryName: {
    fontWeight: 'bold',
  },
};

const Tuple = ({ name, value }) => (
  <td key={name} style={styles.row}>
    <span style={styles.entryName}>{name}:</span> {value}
  </td>
);

Tuple.propTypes = {
  name: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

const TableTableNode = ({ values }) => (
  <table><tbody>
    {values.map((v, index) =>
      <tr key={index}>
        {Object.entries(v).map(([name, value]) =>
          <Tuple key={name} name={name} value={value} />
        )}
      </tr>
    )}
  </tbody></table>
);

TableTableNode.propTypes = {
  values: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default TableTableNode;
