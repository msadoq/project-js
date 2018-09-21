import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import ReactSelectField from 'windowProcess/commonReduxForm/ReactSelectField';
import { catalogType } from 'viewManager/common/Components/types';
import { computeOptions } from 'viewManager/commonEditor/Fields/common';
import ErrorBoundary from 'viewManager/common/Components/ErrorBoundary';

export default class CatalogField extends Component {
  static propTypes = {
    name: PropTypes.string,
    // from container mapStateToProps
    catalogs: PropTypes.oneOfType([
      PropTypes.string, // when requesting
      PropTypes.arrayOf(catalogType),
    ]),
    sessionId: PropTypes.number,
    domainId: PropTypes.number,
    // from container mapDispatchToProps
    askCatalogs: PropTypes.func.isRequired,
    updateCatalogField: PropTypes.func.isRequired,
    loading: PropTypes.bool,
    loaded: PropTypes.bool,
  };

  static defaultProps = {
    name: 'connectedData.catalog',
    catalogs: null,
    sessionId: null,
    domainId: null,
    loading: false,
    loaded: false,
  };

  componentDidMount() {
    this.props.askCatalogs();
  }

  componentWillReceiveProps(nextProps) {
    nextProps.askCatalogs();
  }

  shouldComponentUpdate(nextProps) {
    const { domainId, sessionId } = this.props;
    const { nextDomainId, nextSessionId } = nextProps;

    return nextDomainId !== domainId || nextSessionId !== sessionId;
  }

  render() {
    const {
      catalogs,
      name,
      updateCatalogField,
      loading,
      loaded,
    } = this.props;

    const _getPlaceholder = () => {
      if (loading) {
        return 'Loading catalogs...';
      }

      if (loaded) {
        return 'Select a catalog...';
      }

      return '';
    };

    return (
      <ErrorBoundary>
        <Field
          format={null}
          name={name}
          component={ReactSelectField}
          clearable
          disabled={!loaded}
          options={computeOptions(catalogs)}
          onChange={updateCatalogField}
          placeholder={_getPlaceholder()}
        />
      </ErrorBoundary>
    );
  }
}
