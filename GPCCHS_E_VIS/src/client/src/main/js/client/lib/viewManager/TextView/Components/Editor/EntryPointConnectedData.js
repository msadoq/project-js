import React, { PropTypes, Component } from 'react';
import classnames from 'classnames';
import _get from 'lodash/get';
import {
  Form,
} from 'react-bootstrap';
import { connect } from 'react-redux';
import { reduxForm, formValueSelector } from 'redux-form';
import ClearSubmitButtons from '../../../../windowProcess/commonReduxForm/ClearSubmitButtons';
import EntryPointConnectedDataFields from './EntryPointConnectedDataFields';

/*
  EntryPointConnectedData représente une donnée connectée à un entryPoint.
  Dans le cas de l'éditeur de la Plot, il y en a 2 (en X et Y).

  Composant react-select :
  https://github.com/JedWatson/react-select
*/
class EntryPointConnectedData extends Component {
  componentDidMount() {
    setTimeout(this.props.reset, 0);
  }
  render() {
    const {
      handleSubmit,
      pristine,
      reset,
      submitting,
      valid,
      timelines,
      domains,
      timeline,
    } = this.props;

    return (
      <Form
        horizontal
        onSubmit={handleSubmit}
        className={classnames(
          { 'redux-form-dirty': !pristine },
          'redux-form-padded'
        )}
      >
        <ClearSubmitButtons
          pristine={pristine}
          submitting={submitting}
          reset={reset}
          valid={valid}
        />
        <br />
        <EntryPointConnectedDataFields
          timelines={timelines}
          domains={domains}
          timeline={timeline}
        />
      </Form>
    );
  }
}

EntryPointConnectedData.propTypes = {
  timelines: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.string })).isRequired,
  domains: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  reset: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  valid: PropTypes.bool.isRequired,
  timeline: PropTypes.string,
};

EntryPointConnectedData.defaultProps = {
  timeline: null,
};

const requiredFields = [/* 'formula', 'domain', 'timeline' */];
const validate = (values = {}) => {
  const errors = {};

  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = 'Required';
    }
  });
  return errors;
};

export default reduxForm({
  validate,
  enableReinitialize: true,
})(
  connect(
    (state, props) => {
      const selector = formValueSelector(props.form);
      return {
        timeline: selector(state, 'timeline') || _get(props, 'initialValues.timeline'),
      };
    }
  )(EntryPointConnectedData)
);
