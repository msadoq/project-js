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
    // from container mapDispatchToProps
    askCatalogs: PropTypes.func.isRequired,
    updateCatalogField: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    loaded: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    name: 'connectedData.catalog',
    catalogs: null,
  };

  componentDidUpdate() {
    this.props.askCatalogs();
  }

  _getPlaceholder = () => {
    const { loaded, loading } = this.props;

    if (loading) {
      return 'Loading catalogs...';
    }

    if (loaded) {
      return 'Select a catalog...';
    }

    return '';
  };

  render() {
    const {
      catalogs,
      name,
      updateCatalogField,
      loaded,
    } = this.props;

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
          placeholder={this._getPlaceholder()}
        />
      </ErrorBoundary>
    );
  }
}
