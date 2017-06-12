import React, { PropTypes } from 'react';
import classnames from 'classnames';
import { Alert, FormGroup, Col } from 'react-bootstrap';
import { v4 } from 'uuid';

export default class FileInputField extends React.Component {
  static propTypes = {
    input: PropTypes.shape({
      name: PropTypes.string,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }).isRequired,
    placeholder: PropTypes.string,
    changePath: PropTypes.func.isRequired,
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
  }

  onInputChange = (event) => {
    event.preventDefault();
    this.props.changePath(event.target.value);
  }

  onChoiceChange = (event) => {
    event.preventDefault();
    if (event.target.files) {
      this.props.changePath(event.target.files[0].path);
    }
  }
  onClick = (key) => {
    document.getElementById('my_file'.concat(key)).click();
  }


  render() {
    const {
      input,
      placeholder,
      meta: {
        touched,
        error,
        warning,
      },
    } = this.props;

    const key = v4();

    return (
      <div
        className={classnames({
          'has-error': touched && error,
          'has-warning': touched && warning,
          'has-success': touched && !(error || warning),
        })}
        key={'div'.concat(key)}
      >
        <FormGroup key={'formGroup'.concat(key)}>
          <Col sm={10} key={'col1'.concat(key)}>
            <input
              {...input}
              id={'pathField'.concat(key)}
              placeholder={placeholder}
              type="text"
              className="form-control input-sm"
              onChange={e => this.onInputChange(e)}
            />
          </Col>
          <Col sm={2} key={'col2'.concat(key)}>
            <input
              type="button"
              id={'get_file'.concat(key)}
              style={{ borderRadius: '5px', padding: '6px' }}
              onClick={() => this.onClick(key)}
              value="..."
            />
            <input
              type="file"
              id={'my_file'.concat(key)}
              style={{ display: 'none' }}
              onChange={this.onChoiceChange}
            />
          </Col>
        </FormGroup>
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
