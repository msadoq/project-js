import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { catalogItemType } from 'viewManager/common/Components/types';
import { computeOptions } from 'viewManager/commonEditor/Fields/common';
import VirtualizedSelectField from 'windowProcess/commonReduxForm/VirtualizedSelectField';
import ErrorBoundary from 'viewManager/common/Components/ErrorBoundary';

export default class CatalogItemField extends PureComponent {
  static propTypes = {
    name: PropTypes.string,
    catalogItems: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(catalogItemType),
    ]),
    askCatalogItems: PropTypes.func.isRequired,
    loading: PropTypes.bool,
    loaded: PropTypes.bool,
  };

  static defaultProps = {
    name: 'connectedData.catalogItem',
    catalogItems: null,
    sessionId: null,
    domainId: null,
    loading: false,
    loaded: false,
  };

  componentWillMount() {
    this.props.askCatalogItems();
  }

  componentWillReceiveProps(nextProps) {
    nextProps.askCatalogItems();
  }

  _getPlaceholder = () => {
    const { loading, loaded } = this.props;

    if (loading) {
      return 'Loading catalog items...';
    }

    if (loaded) {
      return 'Select a catalog item...';
    }

    return '';
  };

  render() {
    const {
      catalogItems,
      name,
      loaded,
    } = this.props;

    return (
      <ErrorBoundary>
        <Field
          format={null}
          name={name}
          component={VirtualizedSelectField}
          clearable
          disabled={!loaded}
          options={computeOptions(catalogItems)}
          placeholder={this._getPlaceholder()}
        />
      </ErrorBoundary>
    );
  }
}
