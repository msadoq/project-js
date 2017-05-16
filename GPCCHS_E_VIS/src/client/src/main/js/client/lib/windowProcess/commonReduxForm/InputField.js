import React, { PropTypes } from 'react';
import classnames from 'classnames';
import {
  Alert,
} from 'react-bootstrap';

export default class InputField extends React.Component {
  static propTypes = {
    input: PropTypes.shape({
      name: PropTypes.string,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }).isRequired,
    placeholder: PropTypes.string,
    className: PropTypes.string,
    type: PropTypes.string.isRequired,
    meta: PropTypes.shape({
      active: PropTypes.bool,
      asyncValidating: PropTypes.bool,
      autofilled: PropTypes.bool,
      dirty: PropTypes.bool,
      invalid: PropTypes.bool,
      pristine: PropTypes.bool,
      submitFailed: PropTypes.bool,
      submitting: PropTypes.bool,
      touched: PropTypes.bool,
      visited: PropTypes.bool,
      valid: PropTypes.bool,
    }).isRequired,
  }

  static defaultProps = {
    placeholder: '',
    className: 'form-control input-sm',
  }

  render() {
    const {
      input,
      placeholder,
      type,
      className,
      meta: {
        touched,
        error,
        warning,
      },
    } = this.props;

    return (
      <div
        className={classnames({
          'has-error': touched && error,
          'has-warning': touched && warning,
          'has-success': touched && !(error || warning),
        })}
      >
        <input
          {...input}
          className={className}
          placeholder={placeholder}
          type={type}
        />
        {touched && error && <Alert bsStyle="danger" className="m0">
          {error}
        </Alert>}
        {touched && warning && <Alert bsStyle="warning" className="m0">
          {warning}
        </Alert>}
      </div>
    );
  }
}
