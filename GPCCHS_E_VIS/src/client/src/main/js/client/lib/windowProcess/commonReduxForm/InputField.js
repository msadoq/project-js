// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #3622 : 09/03/2017 : Moving the editor files in viewManager, splitting
//  between commonEditor and commonReduxForm.
// VERSION : 1.1.2 : DM : #5828 : 05/05/2017 : Add possibility to modify domainName and sessionName
//  from GUI for view, page, window and workspace
// VERSION : 1.1.2 : DM : #5828 : 10/05/2017 : Add possibility to modify domainName and sessionName
//  from GUI for view, page, window and workspace
// VERSION : 1.1.2 : DM : #6829 : 07/07/2017 : ReduxForm fix - InputField's value isn't set by
//  props.input.value.
// END-HISTORY
// ====================================================================

import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {
  Alert,
} from 'react-bootstrap';

export default class InputField extends React.Component {
  static propTypes = {
    input: PropTypes.shape({
      name: PropTypes.string,
      onChange: PropTypes.func.isRequired,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }).isRequired,
    placeholder: PropTypes.string,
    className: PropTypes.string,
    type: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
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
  };

  static defaultProps = {
    placeholder: '',
    disabled: false,
    className: 'form-control input-sm',
  };

  onChange = (e) => {
    this.touched = true;
    this.props.input.onChange(e);
  }

  render() {
    const {
      input,
      placeholder,
      type,
      className,
      disabled,
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
        <input
          onChange={this.onChange}
          value={input.value}
          className={className}
          placeholder={placeholder}
          type={type}
          disabled={disabled}
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
