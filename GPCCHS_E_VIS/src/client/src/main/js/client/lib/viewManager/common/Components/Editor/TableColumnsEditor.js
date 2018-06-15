import { React, PureComponent } from 'react';
import PropTypes from 'prop-types';


class TableColumnsEditor extends PureComponent {
  static propTypes = {
    tables: PropTypes.shape(),
  };

  static defaultProps = {
    tables: {},
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        TableColumnsEditor...
      </div>
    );
  }
}

export default TableColumnsEditor;
