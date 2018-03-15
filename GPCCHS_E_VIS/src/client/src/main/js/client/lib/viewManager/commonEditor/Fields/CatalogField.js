import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import ReactSelectField from 'windowProcess/commonReduxForm/ReactSelectField';
import { catalogType } from 'viewManager/common/Components/types';
import { computeOptions } from 'viewManager/commonEditor/Fields/common';

const { string, arrayOf, oneOfType, func, number } = PropTypes;

export default class CatalogField extends Component {
  static propTypes = {
    timelineId: string,
    // from container mapStateToProps
    catalogs: oneOfType([
      string, // when requesting
      arrayOf(catalogType),
    ]),
    sessionId: number,
    domainId: number,
    // from container mapDispatchToProps
    askCatalogs: func.isRequired,
  };

  static defaultProps = {
    catalogs: null,
    sessionId: null,
    domainId: null,
    timelineId: null,
  };


  componentDidMount() {
    this.requestCatalogs(this.props);
  }


  componentWillReceiveProps(nextProps) {
    this.requestCatalogs(nextProps);
  }

  requestCatalogs = (props) => {
    const { domainId, timelineId, sessionId, catalogs, askCatalogs } = props;
    if (!!(domainId && timelineId) && catalogs === null) {
      askCatalogs(domainId, sessionId);
    }
  };

  render() {
    const { catalogs, domainId, timelineId } = this.props;
    const disabled = (!domainId || !timelineId || catalogs === null);
    return (
      <Field
        format={null}
        name="connectedData.catalog"
        component={ReactSelectField}
        clearable
        disabled={disabled}
        options={computeOptions(catalogs)}
      />
    );
  }
}
