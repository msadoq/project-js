// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #3622 : 09/03/2017 : Moving the editor files in viewManager, splitting
//  between commonEditor and commonReduxForm.
// VERSION : 1.1.2 : DM : #5828 : 05/05/2017 : Add possibility to modify domainName and sessionName
//  from GUI for view, page, window and workspace
// VERSION : 1.1.2 : DM : #5828 : 10/05/2017 : Add possibility to modify domainName and sessionName
//  from GUI for view, page, window and workspace
// VERSION : 2.0.0 : FA : #8123 : 27/09/2017 : Fixed redux-form bug with a delay before render in
//  EditPage.
// VERSION : 2.0.0 : DM : #5806 : 13/11/2017 : Fix propTypes in ReactSelectField commonRedux
//  component
// END-HISTORY
// ====================================================================

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
