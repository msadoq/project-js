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
import React from 'react';
import PropTypes from 'prop-types';
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
    multi: PropTypes.bool, // https://github.com/JedWatson/react-select
    simpleValue: PropTypes.bool, // works with multi, https://github.com/JedWatson/react-select
    closeOnSelect: PropTypes.bool, // works with multi, https://github.com/JedWatson/react-select
  };

  static defaultProps = {
    placeholder: '',
    className: '',
    free: false,
    clearable: false,
    multi: false,
    simpleValue: false,
    closeOnSelect: true,
  };

  onChange = (event) => {
    if (this.props.input.onChange) {
      if (event) {
        if (this.props.multi) {
          this.props.input.onChange(event);
        } else {
          this.props.input.onChange(event.value);
        }
      } else {
        this.props.input.onChange('');
      }
    }
  };

  onBlur = () => {
    if (this.props.input.onBlur) {
      this.props.input.onBlur(this.props.input.value);
    }
  };

  render() {
    const {
      input,
      placeholder,
      className,
      clearable,
      options,
      multi,
      simpleValue,
      closeOnSelect,
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
          onChange={this.onChange}
          className={className}
          clearable={clearable}
          autoFocus
          placeholder={placeholder}
          options={options}
          closeOnSelect={closeOnSelect}
          simpleValue={simpleValue}
          multi={multi}
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
