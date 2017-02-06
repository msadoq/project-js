import React, { PropTypes } from 'react';
import classnames from 'classnames';
import {
  Alert,
} from 'react-bootstrap';

export default class InputTextareaField extends React.Component {
  static propTypes = {
    input: PropTypes.object.isRequired,
    placeholder: PropTypes.string,
    className: PropTypes.string,
    rows: PropTypes.string,
    meta: PropTypes.object,
  }

  render() {
    const {
      input,
      placeholder,
      className,
      rows,
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
        <textarea
          {...input}
          className={classnames('form-control', className)}
          placeholder={placeholder}
          rows={rows || '3'}
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
