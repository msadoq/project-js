import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import EntryPointActionsContainer from 'viewManager/commonEditor/EntryPoint/EntryPointActionsContainer';
import EntryPointTreeContainer from 'viewManager/common/Components/Editor/EntryPointTreeContainer';
import ErrorBoundary from 'viewManager/common/Components/ErrorBoundary';
import EntryPointConnectedDataFieldsContainer
  from 'viewManager/common/Components/Editor/EntryPointConnectedDataFieldsContainer';


/**
 * Corresponding views:
 *  - TextView
 *  - MimicView
 */
export default class DataViewEntryPoints extends PureComponent {
  static propTypes = {
    viewId: PropTypes.string.isRequired,
    pageId: PropTypes.string.isRequired,
    search: PropTypes.string,
    viewType: PropTypes.oneOf(['TextView', 'MimicView', 'HistoryView', 'PlotView']).isRequired,
    // from container
    entryPoints: PropTypes.arrayOf(PropTypes.shape()),
    entryPointConnectedDataForm: PropTypes.func,
  };

  static defaultProps = {
    search: null,
    entryPoints: [],
    entryPointConnectedDataForm: EntryPointConnectedDataFieldsContainer,
  };

  render() {
    const {
      entryPoints,
      viewId,
      pageId,
      search,
      viewType,
      entryPointConnectedDataForm,
    } = this.props;
    return (
      <ErrorBoundary>
        <React.Fragment>
          <EntryPointActionsContainer
            viewId={viewId}
            search={search || undefined} // will use EntryPointActions' default value if null
            viewType={viewType}
          />
          <EntryPointTreeContainer
            viewId={viewId}
            pageId={pageId}
            entryPoints={entryPoints}
            search={search}
            entryPointConnectedDataForm={entryPointConnectedDataForm}
          />
        </React.Fragment>
      </ErrorBoundary>
    );
  }
}
