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
    <span>{name}:</span> {value}
  </td>
);

Tuple.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

const TableTableNode = ({ values }) => (
  <table><tbody>
    {values.map((v, index) =>
// eslint-disable-next-line react/no-array-index-key
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
