import React, { PropTypes } from 'react';
import classnames from 'classnames';
import { Alert, FormGroup, Col } from 'react-bootstrap';

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
  onClick = () => {
    document.getElementById('my_file').click();
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

    return (
      <div
        className={classnames({
          'has-error': touched && error,
          'has-warning': touched && warning,
          'has-success': touched && !(error || warning),
        })}
      >
        <FormGroup >
          <Col sm={10}>
            <input
              {...input}
              id="pathField"
              placeholder={placeholder}
              type="text"
              className="form-control input-sm"
              onChange={e => this.onInputChange(e)}
            />
          </Col>
          <Col sm={2}>
            <input
              type="button"
              id="get_file"
              style={{ borderRadius: '5px', padding: '6px' }}
              onClick={this.onClick}
              value="..."
            />
            <input
              type="file"
              id="my_file"
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
