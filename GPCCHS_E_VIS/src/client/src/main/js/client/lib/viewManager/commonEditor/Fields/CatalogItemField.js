import React, { PureComponent, PropTypes } from 'react';
import { Field } from 'redux-form';
import ReactSelectField from 'windowProcess/commonReduxForm/ReactSelectField';
import { catalogItemType } from 'viewManager/common/Components/types';
import { computeOptions } from 'viewManager/commonEditor/Fields/common';

const { string, arrayOf, oneOfType, func, number } = PropTypes;

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
  };

  static defaultProps = {
    catalogItems: null,
    sessionId: null,
    domainId: null,
    timelineId: null,
    catalogName: null,
  };

  componentWillReceiveProps(nextProps) {
    const {
      domainId,
      timelineId,
      sessionId,
      catalogItems,
      askCatalogItems,
      catalogName,
    } = nextProps;

    if (!!(domainId && timelineId && catalogName) && catalogItems === null) {
      askCatalogItems(domainId, sessionId, catalogName);
    }
  }

  render() {
    const { catalogItems, domainId, timelineId, catalogName } = this.props;
    const disabled = (!domainId || !timelineId || !catalogName || catalogItems === null);
    return (
      <Field
        format={null}
        name="catalogItem"
        component={ReactSelectField}
        clearable
        disabled={disabled}
        options={computeOptions(catalogItems)}
      />
    );
  }
}
