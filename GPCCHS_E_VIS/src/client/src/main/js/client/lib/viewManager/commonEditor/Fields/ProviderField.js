import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { computeOptions } from 'viewManager/commonEditor/Fields/common';
import ReactSelectField from 'windowProcess/commonReduxForm/ReactSelectField';
import ErrorBoundary from 'viewManager/common/Components/ErrorBoundary';

export default class ProviderField extends PureComponent {
  static propTypes = {
    // own props
    onChange: PropTypes.func,
    // from container mapStateToProps
    providers: PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.string })).isRequired,
  };

  static defaultProps = {
    onChange: null,
  };

  render() {
    return (
      <ErrorBoundary>
        <Field
          format={null}
          name="connectedData.provider"
          component={ReactSelectField}
          clearable
          options={computeOptions(this.props.providers, false)}
          onChange={this.props.onChange}
        />
      </ErrorBoundary>
    );
  }
}
