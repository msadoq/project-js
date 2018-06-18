import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import ReactSelectField from 'windowProcess/commonReduxForm/ReactSelectField';
import { computeOptions } from 'viewManager/commonEditor/Fields/common';
import { domainsType } from 'viewManager/common/Components/types';

const { func, string } = PropTypes;

export default class DomainField extends PureComponent {
  static propTypes = {
    onChange: func,
    name: string,
    // from container mapStateToProps
    domains: domainsType.isRequired,
  };

  static defaultProps = {
    onChange: null,
    name: 'connectedData.domain',
  };

  render() {
    return (
      <Field
        format={null}
        name={this.props.name}
        component={ReactSelectField}
        clearable
        options={computeOptions(this.props.domains, true)}
        onChange={this.props.onChange}
      />
    );
  }
}
