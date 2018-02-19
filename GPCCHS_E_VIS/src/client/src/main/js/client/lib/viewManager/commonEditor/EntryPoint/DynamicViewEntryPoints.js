import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import HorizontalFormGroup from 'windowProcess/commonReduxForm/HorizontalFormGroup';
import DomainFieldContainer from 'viewManager/commonEditor/Fields/DomainFieldContainer';
import TimelineFieldContainer from 'viewManager/commonEditor/Fields/TimelineFieldContainer';
import CatalogFieldContainer from 'viewManager/commonEditor/Fields/CatalogFieldContainer';
import CatalogItemFieldContainer from 'viewManager/commonEditor/Fields/CatalogItemFieldContainer';
import ComObjectContainer from 'viewManager/commonEditor/Fields/ComObjectContainer';
import { reduxFormFieldsType } from 'viewManager/common/Components/types';
import { Field } from 'redux-form';
import TextareaField from 'windowProcess/commonReduxForm/TextareaField';

const { string } = PropTypes;

/**
 * Corresponding views:
 *  - DynamicView
 */
export default class DynamicViewEntryPoints extends PureComponent {
  static propTypes = {
    viewId: string.isRequired,
    pageId: string.isRequired,
    selectedDomainName: string,
    selectedTimelineId: string,
    selectedCatalogName: string,
    selectedItemName: string,
    ...reduxFormFieldsType,
  };

  static defaultProps = {
    selectedDomainName: null,
    selectedTimelineId: null,
    selectedCatalogName: null,
    selectedItemName: null,
  };

  static contextTypes = {
    windowId: PropTypes.string,
  };

  render() {
    const { windowId } = this.context;
    const {
      viewId,
      pageId,
      selectedDomainName,
      selectedTimelineId,
      selectedCatalogName,
      selectedItemName,
    } = this.props;

    return (
      <div>
        <HorizontalFormGroup label="Formula">
          <Field
            name="formula"
            component={TextareaField}
            rows="4"
            className="form-control input-sm"
          />
        </HorizontalFormGroup>

        <HorizontalFormGroup label="Domain">
          <DomainFieldContainer
            domainName={selectedDomainName}
          />
        </HorizontalFormGroup>

        <HorizontalFormGroup label="Timeline">
          <TimelineFieldContainer
            timelineName={selectedTimelineId}
            windowId={windowId}
          />
        </HorizontalFormGroup>

        <HorizontalFormGroup label="Catalog">
          <CatalogFieldContainer
            domainName={selectedDomainName}
            timelineId={selectedTimelineId}
            viewId={viewId}
            pageId={pageId}
          />
        </HorizontalFormGroup>

        <HorizontalFormGroup label="Catalog item">
          <CatalogItemFieldContainer
            domainName={selectedDomainName}
            timelineId={selectedTimelineId}
            catalogName={selectedCatalogName}
            viewId={viewId}
            pageId={pageId}
          />
        </HorizontalFormGroup>

        <HorizontalFormGroup label="Com object">
          <ComObjectContainer
            domainName={selectedDomainName}
            timelineId={selectedTimelineId}
            catalogName={selectedCatalogName}
            itemName={selectedItemName}
            viewId={viewId}
            pageId={pageId}
          />
        </HorizontalFormGroup>
      </div>
    );
  }
}
