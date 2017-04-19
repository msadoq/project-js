// import moment from 'moment';
import React, { PureComponent, PropTypes } from 'react';
import _get from 'lodash/get';
import _set from 'lodash/set';
import { reduxForm, Field } from 'redux-form';
import {
  Form,
  ButtonGroup,
  Button,
} from 'react-bootstrap';
import InputField from '../commonReduxForm/InputField';
import HorizontalFormGroup from '../commonReduxForm/HorizontalFormGroup';

class EditPage extends PureComponent {

  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    uuid: PropTypes.string.isRequired,
    pages: PropTypes.shape().isRequired,
    pristine: PropTypes.bool.isRequired,
    submitting: PropTypes.bool.isRequired,
    valid: PropTypes.bool.isRequired,
  }

  static defaultProps = {
    masterId: null,
  }

  state = {
    disableSubmit: false,
  }

  disableSubmit = (flag) => {
    this.setState({
      disableSubmit: flag,
    });
  }

  render() {
    const {
      pristine,
      uuid,
      submitting,
      valid,
      pages,
      handleSubmit,
    } = this.props;
    const { disableSubmit } = this.state;

    return (
      <Form horizontal onSubmit={handleSubmit}>

        <HorizontalFormGroup label="Name">
          <Field
            name="title"
            component={InputField}
            type="text"
            className="form-control input-sm"
            validate={(val) => {
              if (
                Object.keys(pages).find(uid => pages[uid].title === val && pages[uid].uuid !== uuid)
              ) {
                return 'This title is already taken';
              }
              return undefined;
            }}
          />
        </HorizontalFormGroup>

        <div className="text-right">
          <ButtonGroup>
            <Button
              bsStyle="success"
              type="submit"
              disabled={pristine || submitting || !valid || disableSubmit}
            >
              Submit
            </Button>
          </ButtonGroup>
        </div>
      </Form>
    );
  }
}

const requiredFields = ['uuid'];
const validate = (values = {}) => {
  const errors = {};
  requiredFields.forEach((fieldPath) => {
    if (!_get(values, fieldPath)) {
      _set(errors, fieldPath, 'Required');
    }
  });

  return errors;
};

export default reduxForm({
  validate,
  enableReinitialize: true,
})(EditPage);
