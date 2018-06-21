import { React, PureComponent } from 'react';
import PropTypes from 'prop-types';
import ErrorBoundary from 'viewManager/common/Components/ErrorBoundary';

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
      <ErrorBoundary>
        TableColumnsEditor...
      </ErrorBoundary>
    );
  }
}

export default TableColumnsEditor;
