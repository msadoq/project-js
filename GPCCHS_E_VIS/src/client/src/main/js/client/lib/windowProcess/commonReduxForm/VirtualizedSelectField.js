/* eslint import/no-webpack-loader-syntax:0 */
import React from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'react-bootstrap';
import classnames from 'classnames';
import VirtualizedSelect from 'react-virtualized-select';
import '!style!css!react-select/dist/react-select.css';
import '!style!css!react-virtualized/styles.css';
import '!style!css!react-virtualized-select/styles.css';

export default class VirtualizedSelectField extends React.Component {
  static propTypes = {
    input: PropTypes.shape({
      name: PropTypes.string,
      value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]),
      onChange: PropTypes.func,
      onBlur: PropTypes.func,
    }).isRequired,
    placeholder: PropTypes.string,
    className: PropTypes.string,
    free: PropTypes.bool,
    onInputChange: PropTypes.func,
    clearable: PropTypes.bool,
    options: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]),
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
    onInputChange: null,
  }

  onInputChange = (value) => {
    const {
      onInputChange,
      input,
    } = this.props;
    if (value && onInputChange) {
      input.onChange(value);
      onInputChange(value);
    }
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
      clearable,
      options,
      meta: {
        touched,
        error,
        warning,
      },
      ...rest
    } = this.props;

    return (
      <div
        className={classnames({
          'has-error': touched && error,
          'has-warning': touched && warning,
        })}
      >
        <VirtualizedSelect
          {...input}
          {...rest}
          onBlur={this.onBlur}
          options={options}
          onChange={this.onChange}
          className={className}
          placeholder={placeholder}
          clearable={clearable}
          autoFocus
          optionHeight={28}
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
