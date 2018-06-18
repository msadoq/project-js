import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { catalogItemType } from 'viewManager/common/Components/types';
import { computeOptions } from 'viewManager/commonEditor/Fields/common';
import VirtualizedSelectField from 'windowProcess/commonReduxForm/VirtualizedSelectField';

const { bool, string, arrayOf, oneOfType, func, number } = PropTypes;

export default class CatalogItemField extends PureComponent {
  static propTypes = {
    catalogItems: oneOfType([
      string,
      arrayOf(catalogItemType),
    ]),
    askCatalogItems: func.isRequired,
    sessionId: number,
    domainId: number,
    timelineId: string,
    catalogName: string,
    catalogsLoaded: bool,
    askUnit: func.isRequired,
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
  }

  render() {
    const { catalogItems, domainId, timelineId, catalogName, askUnit, sessionId } = this.props;
    const disabled = (!domainId || !timelineId || !catalogName || catalogItems === null);
    return (
      <Field
        format={null}
        name="connectedData.catalogItem"
        component={VirtualizedSelectField}
        clearable
        disabled={disabled}
        options={computeOptions(catalogItems)}
        onChange={(o, value) => {
          askUnit(domainId, sessionId, catalogName, value);
        }}
      />
    );
  }
}
