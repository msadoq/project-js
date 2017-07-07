import React, { PropTypes } from 'react';
import classnames from 'classnames';
import {
  Alert,
} from 'react-bootstrap';

export default class InputTextareaField extends React.Component {
  static propTypes = {
    input: PropTypes.shape({
      name: PropTypes.string,
      value: PropTypes.string,
      onChange: PropTypes.func,
      onBlur: PropTypes.func,
    }).isRequired,
    placeholder: PropTypes.string,
    className: PropTypes.string,
    rows: PropTypes.string,
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
    className: '',
    placeholder: '',
    rows: '3',
  }

  componentDidUpdate() {
    /*
      on mount, component is rendered but input.value is empty, and
      present only at the second render, we want to fill the input
      when we receive this value (2nd render)
    */
    if (this.props.input.value && !this.el.value) {
      this.el.value = this.props.input.value;
    }
  }

  onChange = (e) => {
    this.touched = true;
    this.props.input.onChange(e);
  }

  assignEl = (el) => { this.el = el; }

  render() {
    const {
      input,
      placeholder,
      className,
      rows,
      meta: {
        error,
        warning,
      },
    } = this.props;

    return (
      <div
        className={classnames({
          'has-error': this.touched && error,
          'has-warning': this.touched && warning,
          'has-success': this.touched && !(error || warning),
        })}
      >
        <textarea
          onChange={this.onChange}
          defaultValue={input.value}
          ref={this.assignEl}
          className={classnames('form-control', className)}
          placeholder={placeholder}
          rows={rows}
        />
        {this.touched && error && <Alert bsStyle="danger" className="m0">
          {error}
        </Alert>}
        {this.touched && warning && <Alert bsStyle="warning" className="m0">
          {warning}
        </Alert>}
      </div>
    );
  }
}
