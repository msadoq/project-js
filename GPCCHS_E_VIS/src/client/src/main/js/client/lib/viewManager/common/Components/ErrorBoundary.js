import React from 'react';
import PropTypes from 'prop-types';
import getLogger from 'common/logManager';

const logger = getLogger('common:ErrorBoundary');

/**
 * @link https://reactjs.org/docs/error-boundaries.html
 */
export default class ErrorBoundary extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    // Display fallback UI
    this.setState({ hasError: true });
    // You can also log the error to an error reporting service
    logger.error(error);
    logger.info(info);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}

