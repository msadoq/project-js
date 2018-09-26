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
    shouldLoadCatalogItems: PropTypes.bool,
    loading: PropTypes.bool,
    loaded: PropTypes.bool,
  };

  static defaultProps = {
    name: 'connectedData.catalogItem',
    catalogItems: null,
    sessionId: null,
    domainId: null,
    shouldLoadCatalogItems: false,
    loading: false,
    loaded: false,
  };

  componentWillMount() {
    this.tryToLoadCatalogItems(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.tryToLoadCatalogItems(nextProps);
  }

  tryToLoadCatalogItems = (props) => {
    const {
      askCatalogItems,
    } = props;

    askCatalogItems();
  };

  render() {
    const {
      catalogItems,
      name,
      loading,
      loaded,
    } = this.props;

    const _getPlaceholder = () => {
      if (loading) {
        return 'Loading catalog items...';
      }

      if (loaded) {
        return 'Selec a catalog item...';
      }

      return '';
    };

    return (
      <ErrorBoundary>
        <Field
          format={null}
          name={name}
          component={VirtualizedSelectField}
          clearable
          disabled={!loaded}
          options={computeOptions(catalogItems)}
          placeholder={_getPlaceholder()}
        />
      </ErrorBoundary>
    );
  }
}
