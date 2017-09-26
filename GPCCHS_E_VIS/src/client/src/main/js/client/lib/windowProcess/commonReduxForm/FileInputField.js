// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #6785 : 31/05/2017 : Add Misc/links in view editor
// VERSION : 1.1.2 : DM : #6785 : 12/06/2017 : Fix path recovery on wrong field
// VERSION : 1.1.2 : DM : #6785 : 13/06/2017 : Fix path writing after choice
// VERSION : 1.1.2 : DM : #6785 : 29/06/2017 : Fix opening view link in a new page and read only path for link definition
// END-HISTORY
// ====================================================================

import React, { PropTypes } from 'react';
import classnames from 'classnames';
import { Alert, FormGroup, Col } from 'react-bootstrap';
import path from 'path';
import { get } from '../../common/configurationManager';

const fmdPath = get('ISIS_DOCUMENTS_ROOT');

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
    myFormKey: PropTypes.string.isRequired,
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
      // Get path relative to FMD
      let pathInFmd = path.relative(fmdPath, event.target.files[0].path);
      // Add / at beginning to indicate the path is from FMD
      pathInFmd = ('/').concat(pathInFmd);
      this.props.changePath(pathInFmd);
    }
  }

  onClick = () => {
    document.getElementById('my_file'.concat(this.props.myFormKey)).click();
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
      myFormKey,
    } = this.props;

    return (
      <div
        className={classnames({
          'has-error': touched && error,
          'has-warning': touched && warning,
          'has-success': touched && !(error || warning),
        }, { width: '100%' })}
        key={'div'.concat(myFormKey)}
      >
        <FormGroup key={'formGroup'.concat(myFormKey)}>
          <Col xs={11} key={'col1'.concat(myFormKey)}>
            <input
              {...input}
              id={'pathField'.concat(myFormKey)}
              placeholder={placeholder}
              type="text"
              className="form-control input-xs"
              onChange={e => this.onInputChange(e)}
            />
          </Col>
          <Col xs={1} key={'col2'.concat(myFormKey)}>
            <button
              type="button"
              id={'get_file'.concat(this.props.myFormKey)}
              style={{ borderRadius: '5px', padding: '6px' }}
              onClick={this.onClick}
            >
              ...
            </button>
            <input
              type="file"
              id={'my_file'.concat(myFormKey)}
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
