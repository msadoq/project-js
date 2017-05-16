/* eslint import/no-webpack-loader-syntax:0 */
import React, { PropTypes } from 'react';
import Select from 'react-select';
import { Alert } from 'react-bootstrap';
import classnames from 'classnames';
import '!style!css!react-select/dist/react-select.css';

export default class ReactSelectField extends React.Component {
  static propTypes = {
    input: PropTypes.shape({
      name: PropTypes.string,
      value: PropTypes.string,
      onChange: PropTypes.func,
      onBlur: PropTypes.func,
    }).isRequired,
    placeholder: PropTypes.string,
    className: PropTypes.string,
    free: PropTypes.bool,
    clearable: PropTypes.bool,
    options: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string,
    })).isRequired,
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
    className: '',
    free: false,
    clearable: false,
  }

  onChange = (event) => {
    if (this.props.input.onChange) {
      if (event) {
        this.props.input.onChange(event.value);
      } else {
        this.props.input.onChange('');
      }
    }
  }

  onInputChange = (val) => {
    if (this.props.free) {
      this.props.input.onChange(val);
    }
  }

  onBlur = () => {
    if (this.props.input.onBlur) {
      this.props.input.onBlur(this.props.input.value);
    }
  }

  render() {
    const {
      input,
      placeholder,
      className,
      free,
      clearable,
      meta: {
        touched,
        error,
        warning,
      },
      ...rest
    } = this.props;
    let { options } = this.props;

    if (!options.find(e => e.value === input.value) && free) {
      options = options.concat({
        label: input.value,
        value: input.value,
        clearable,
      });
    }

    return (
      <div
        className={classnames({
          'has-error': touched && error,
          'has-warning': touched && warning,
        })}
      >
        <Select
          {...input}
          {...rest}
          onBlur={this.onBlur}
          options={options}
          onChange={this.onChange}
          onInputChange={this.onInputChange}
          className={className}
          placeholder={placeholder}
          clearable={clearable}
          autofocus
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
