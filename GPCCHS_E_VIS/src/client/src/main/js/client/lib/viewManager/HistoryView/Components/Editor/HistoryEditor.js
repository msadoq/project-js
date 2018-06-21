// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #6127 : 12/04/2017 : Prepare minimalistic HistoryView . .
// VERSION : 2.0.0 : DM : #7111 : 20/09/2017 : Add editor in history view data and fix history view
//  data reducer
// VERSION : 2.0.0 : DM : #5806 : 06/12/2017 : Change all relative imports .
// END-HISTORY
// ====================================================================

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Navbar from 'viewManager/commonEditor/Navbar/Navbar';
import ReloadAndSaveViewButtonsContainer from 'viewManager/commonEditor/ReloadAndSaveViewButtonsContainer';
import { Misc } from 'viewManager/commonEditor/Misc';
import styles from 'viewManager/commonEditor/Editor.css';
import HistoryTabContainer from 'viewManager/HistoryView/Components/Editor/HistoryTabContainer';
import DataViewEntryPointsContainer from 'viewManager/commonEditor/EntryPoint/DataViewEntryPointsContainer';
import ErrorBoundary from 'viewManager/common/Components/ErrorBoundary';

import HistoryEntryPointConnectedDataFieldsContainer from './HistoryEntryPointConnectedDataFieldsContainer';

const navBarItems = ['Entry Points', 'History', 'Misc'];

export default class Editor extends Component {
  static propTypes = {
    search: PropTypes.string,
    viewId: PropTypes.string.isRequired,
    pageId: PropTypes.string.isRequired,
    // from container mapStateToProps
    title: PropTypes.string,
    configuration: PropTypes.shape({
      entryPoints: PropTypes.array,
    }).isRequired,
    panels: PropTypes.shape({}).isRequired,
    tab: PropTypes.number,
    // from container mapDispatchToProps
    openModal: PropTypes.func.isRequired,
    updateViewTab: PropTypes.func.isRequired,
    updateViewPanels: PropTypes.func.isRequired,
  };
  static defaultProps = {
    tab: null,
    title: '',
    search: null,
  };
  changeCurrentDisplay = (id) => {
    const { updateViewTab, viewId } = this.props;
    updateViewTab(viewId, id);
  };

  render() {
    const {
      openModal,
      tab,
      viewId,
      pageId,
      search,
      panels,
      title,
      updateViewPanels,
      configuration: {
        entryPoints,
      },
    } = this.props;

    return (
      <ErrorBoundary>
        <div className={styles.contentWrapper}>
          <h4
            className="text-center mb10"
          >
            <span className="mr5 EditorVignette" />
            <b>{title}</b>
          </h4>
          <ReloadAndSaveViewButtonsContainer viewId={viewId} />
          <Navbar
            currentDisplay={tab === null ? 0 : tab}
            items={navBarItems}
            changeCurrentDisplay={this.changeCurrentDisplay}
          />
          <div className={styles.content}>
            {
              (tab === 0 || tab === null) &&
              <div>
                <DataViewEntryPointsContainer
                  entryPoints={entryPoints}
                  viewId={viewId}
                  pageId={pageId}
                  search={search}
                  viewType={'HistoryView'}
                  entryPointConnectedDataForm={HistoryEntryPointConnectedDataFieldsContainer}
                />
              </div>
            }
            {
              tab === 1 &&
              <HistoryTabContainer
                updateViewPanels={updateViewPanels}
                viewId={viewId}
                panels={panels}
              />
            }
            {
              tab === 2 &&
              <Misc
                updateViewPanels={updateViewPanels}
                viewId={viewId}
                panels={panels}
                openModal={openModal}
              />}
          </div>
        </div>
      </ErrorBoundary>
    );
  }
}
