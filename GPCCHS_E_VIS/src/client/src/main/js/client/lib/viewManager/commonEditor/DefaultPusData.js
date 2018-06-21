/* eslint-disable no-unused-vars */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ErrorBoundary from 'viewManager/common/Components/ErrorBoundary';
import HorizontalFormGroup from 'windowProcess/commonReduxForm/HorizontalFormGroup';
import DomainFieldContainer from 'viewManager/commonEditor/Fields/DomainFieldContainer';
import ApplicationProcessFieldContainer from 'viewManager/commonEditor/Fields/ApplicationProcessFieldContainer';
import SessionFieldContainer from './Fields/SessionFieldContainer';

export default class DefaultPusData extends PureComponent {
  static propTypes = {
    // Own props
    viewId: PropTypes.string.isRequired,
    pageId: PropTypes.string.isRequired,
    change: PropTypes.func.isRequired,
    // From DefaultPusDataContainer's mapStateToProps
    selectedDomainName: PropTypes.string,
    selectedSessionName: PropTypes.string,
  };

  static defaultProps = {
    selectedDomainName: null,
    selectedSessionName: null,
    selectedCatalogName: null,
    selectedItemName: null,
  };

  static contextTypes = {
    windowId: PropTypes.string,
  };

  handleChange = (apid, fieldName) => {
    const { change } = this.props;
    change(fieldName, apid);
  };

  render() {
    const {
      viewId,
      pageId,
      selectedDomainName,
      selectedSessionName,
    } = this.props;

    return (
      <ErrorBoundary>
        <React.Fragment>
          <HorizontalFormGroup label="Domain">
            <DomainFieldContainer />
          </HorizontalFormGroup>

          <HorizontalFormGroup label="Session">
            <SessionFieldContainer />
          </HorizontalFormGroup>

          <HorizontalFormGroup label="Application Process">
            <ApplicationProcessFieldContainer
              domainName={selectedDomainName}
              sessionName={selectedSessionName}
              viewId={viewId}
              pageId={pageId}
              onChange={this.handleChange}
            />
          </HorizontalFormGroup>
        </React.Fragment>
      </ErrorBoundary>
    );
  }
}
