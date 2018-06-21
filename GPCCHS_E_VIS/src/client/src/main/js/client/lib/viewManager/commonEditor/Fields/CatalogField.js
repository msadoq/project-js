import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import ReactSelectField from 'windowProcess/commonReduxForm/ReactSelectField';
import { catalogType } from 'viewManager/common/Components/types';
import { computeOptions } from 'viewManager/commonEditor/Fields/common';
import ErrorBoundary from 'viewManager/common/Components/ErrorBoundary';

export default class CatalogField extends Component {
  static propTypes = {
    timelineId: PropTypes.string,
    // from container mapStateToProps
    catalogs: PropTypes.oneOfType([
      PropTypes.string, // when requesting
      PropTypes.arrayOf(catalogType),
    ]),
    sessionId: PropTypes.number,
    domainId: PropTypes.number,
    // from container mapDispatchToProps
    askCatalogs: PropTypes.func.isRequired,
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
    if (domainId !== null && timelineId !== null && catalogs === null) {
      askCatalogs(domainId, sessionId);
    }
  };

  render() {
    const { catalogs, domainId, timelineId } = this.props;
    const disabled = (!domainId || !timelineId || catalogs === null);
    return (
      <ErrorBoundary>
        <Field
          format={null}
          name="connectedData.catalog"
          component={ReactSelectField}
          clearable
          disabled={disabled}
          options={computeOptions(catalogs)}
        />
      </ErrorBoundary>
    );
  }
}
