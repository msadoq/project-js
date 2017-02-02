import React, { PropTypes } from 'react';
import classnames from 'classnames';
import {
  Alert
} from 'react-bootstrap';

export default class InputField extends React.Component {
  static propTypes = {
    input: PropTypes.object.isRequired,
    placeholder: PropTypes.string,
    className: PropTypes.string,
    type: PropTypes.string.isRequired,
    meta: PropTypes.object
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
        warning
      }
    } = this.props;

    return (
      <div
        className={classnames({
          'has-error': touched && error,
          'has-warning': touched && warning,
          'has-success': touched && !(error || warning)
        })}
      >
        <input
          {...input}
          className={classnames('form-control input-sm', className)}
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
