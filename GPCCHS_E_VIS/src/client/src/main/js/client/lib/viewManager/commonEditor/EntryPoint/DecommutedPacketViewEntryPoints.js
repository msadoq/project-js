/* eslint-disable no-unused-vars */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import HorizontalFormGroup from 'windowProcess/commonReduxForm/HorizontalFormGroup';
import CatalogFieldContainer from 'viewManager/commonEditor/Fields/CatalogFieldContainer';
import CatalogItemFieldContainer from 'viewManager/commonEditor/Fields/CatalogItemFieldContainer';
import ComObjectContainer from 'viewManager/commonEditor/Fields/ComObjectContainer';
import { reduxFormFieldsType } from 'viewManager/common/Components/types';
import ProviderFieldContainer from 'viewManager/commonEditor/Fields/ProviderFieldContainer';

const { string } = PropTypes;

/**
 * Corresponding views:
 *  - DecommutedPacketView
 */
export default class DecommutedPacketViewEntryPoints extends PureComponent {
  static propTypes = {
    viewId: string.isRequired,
    pageId: string.isRequired,
    domainName: string,
    selectedCatalogName: string,
    sessionName: string,
    ...reduxFormFieldsType,
  };

  static defaultProps = {
    domainName: null,
    selectedCatalogName: null,
    selectedItemName: null,
  };

  static contextTypes = {
    windowId: PropTypes.string,
  };

  render() {
    const {
      viewId,
      pageId,
      domainName,
      selectedCatalogName,
      sessionName,
    } = this.props;

    return (
      <React.Fragment>
        <HorizontalFormGroup label="Catalog">
          <CatalogFieldContainer
            domainName={domainName}
            viewSessionName={sessionName}
            timelineId="no timeline selector in the view"
            viewId={viewId}
            pageId={pageId}
          />
        </HorizontalFormGroup>

        <HorizontalFormGroup label="Catalog item">
          <CatalogItemFieldContainer
            domainName={domainName}
            viewSessionName={sessionName}
            timelineId="no timeline selector in the view"
            catalogName={selectedCatalogName}
            viewId={viewId}
            pageId={pageId}
          />
        </HorizontalFormGroup>

        <HorizontalFormGroup label="Provider">
          <ProviderFieldContainer />
        </HorizontalFormGroup>
      </React.Fragment>
    );
  }
}
