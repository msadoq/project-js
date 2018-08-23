import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { catalogItemType } from 'viewManager/common/Components/types';
import { computeOptions } from 'viewManager/commonEditor/Fields/common';
import VirtualizedSelectField from 'windowProcess/commonReduxForm/VirtualizedSelectField';
import ErrorBoundary from 'viewManager/common/Components/ErrorBoundary';

export default class CatalogItemField extends PureComponent {
  static propTypes = {
    catalogItems: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(catalogItemType),
    ]),
    askCatalogItems: PropTypes.func.isRequired,
    sessionId: PropTypes.number,
    domainId: PropTypes.number,
    timelineId: PropTypes.string,
    catalogName: PropTypes.string,
    catalogsLoaded: PropTypes.bool,
  };

  static defaultProps = {
    catalogItems: null,
    sessionId: null,
    domainId: null,
    timelineId: null,
    catalogName: null,
    catalogsLoaded: false,
  };

  componentWillMount() {
    this.tryToLoadCatalogItems(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.tryToLoadCatalogItems(nextProps);
  }

  tryToLoadCatalogItems = (props) => {
    const {
      domainId,
      timelineId,
      sessionId,
      catalogItems,
      askCatalogItems,
      catalogName,
      catalogsLoaded,
    } = props;

    if (!!(domainId && timelineId && catalogName) && catalogItems === null && catalogsLoaded) {
      askCatalogItems(domainId, sessionId, catalogName);
    }
  };

  render() {
    const { catalogItems, domainId, timelineId, catalogName } = this.props;
    const disabled = (!domainId || !timelineId || !catalogName || catalogItems === null);
    return (
      <ErrorBoundary>
        <Field
          format={null}
          name="connectedData.catalogItem"
          component={VirtualizedSelectField}
          clearable
          disabled={disabled}
          options={computeOptions(catalogItems)}
        />
      </ErrorBoundary>
    );
  }
}
