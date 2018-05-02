import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import EntryPointActionsContainer from 'viewManager/commonEditor/EntryPoint/EntryPointActionsContainer';
import EntryPointTreeContainer from 'viewManager/common/Components/Editor/EntryPointTreeContainer';

const { string, oneOf, shape, arrayOf } = PropTypes;

/**
 * Corresponding views:
 *  - TextView
 *  - MimicView
 */
export default class DataViewEntryPoints extends PureComponent {
  static propTypes = {
    viewId: string.isRequired,
    pageId: string.isRequired,
    search: string,
    viewType: oneOf(['TextView', 'MimicView', 'HistoryView', 'PlotView']).isRequired,
    // from container
    entryPoints: arrayOf(shape()),
  };

  static defaultProps = {
    search: null,
    entryPoints: [],
  };

  render() {
    const {
      entryPoints,
      viewId,
      pageId,
      search,
      viewType,
    } = this.props;
    return (
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
        />
      </React.Fragment>
    );
  }
}
