import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import ReactSelectField from 'windowProcess/commonReduxForm/ReactSelectField';
import { computeOptions } from 'viewManager/commonEditor/Fields/common';
import { sessionsType } from 'viewManager/common/Components/types';

const { func, string } = PropTypes;

export default class SessionField extends PureComponent {
  static propTypes = {
    onChange: func,
    name: string,
    // from container mapStateToProps
    sessions: sessionsType.isRequired,
  };

  static defaultProps = {
    onChange: null,
    name: 'connectedData.session',
  };

  render() {
    return (
      <div>
        <Field
          format={null}
          name={this.props.name}
          component={ReactSelectField}
          clearable
          options={computeOptions(this.props.sessions, true)}
          onChange={this.props.onChange}
        />
      </div>
    );
  }
}
