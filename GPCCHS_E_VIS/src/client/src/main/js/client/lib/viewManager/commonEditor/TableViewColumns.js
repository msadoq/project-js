import React from 'react';
import PropTypes from 'prop-types';
import { TableConfigurationColumnType } from 'viewManager/common/Components/types';

const { arrayOf } = PropTypes;

// eslint-disable-next-line react/prefer-stateless-function
export default class TableViewColumns extends React.Component {
  static propTypes = {
    // own props
    // viewId: string.isRequired,
    // from Container mapStateToProps
    cols: arrayOf(TableConfigurationColumnType).isRequired,
  };

  render() {
    const { cols } = this.props;
    return (
      <ol>
        {cols.map((column, ikey) =>
          (<li key={'div'.concat(ikey)}>{column.title}</li>)
          )}
      </ol>
    );
  }
}
