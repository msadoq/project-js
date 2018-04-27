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
import HistoryTab from 'viewManager/HistoryView/Components/Editor/HistoryTab';
import DataViewEntryPointsContainer from 'viewManager/commonEditor/EntryPoint/DataViewEntryPointsContainer';

const navBarItems = ['Entry Points', 'History', 'Misc'];
const { string, number, func, shape, array } = PropTypes;

export default class Editor extends Component {
  static propTypes = {
    search: string,
    viewId: string.isRequired,
    pageId: string.isRequired,
    // from container mapStateToProps
    title: string,
    titleStyle: shape(),
    configuration: shape({
      entryPoints: array,
    }).isRequired,
    panels: shape({}).isRequired,
    tab: number,
    // from container mapDispatchToProps
    openModal: func.isRequired,
    updateViewTab: func.isRequired,
    updateViewPanels: func.isRequired,
  };
  static defaultProps = {
    titleStyle: {},
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
      titleStyle,
      title,
      updateViewPanels,
      configuration: {
        entryPoints,
      },
    } = this.props;

    return (
      <div className={styles.contentWrapper}>
        <h4
          className="text-center mb10"
        >
          <span className="mr5 EditorVignette" style={{ background: titleStyle.bgColor }} />
          <b>{title}</b>
        </h4>
        <ReloadAndSaveViewButtonsContainer viewId={viewId} />
        <Navbar
          currentDisplay={tab === null ? 0 : tab}
          items={navBarItems}
          changeCurrentDisplay={this.changeCurrentDisplay}
        />
        <div className={styles.content}>
          {(tab === 0 || tab === null) &&
          <div>
            <DataViewEntryPointsContainer
              entryPoints={entryPoints}
              viewId={viewId}
              pageId={pageId}
              search={search}
              viewType={'HistoryView'}
            />
          </div>}
          {tab === 1 && <HistoryTab />}
          {tab === 2 &&
            <Misc
              updateViewPanels={updateViewPanels}
              viewId={viewId}
              panels={panels}
              openModal={openModal}
            />}
        </div>
      </div>
    );
  }
}
