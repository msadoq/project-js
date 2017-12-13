// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 07/04/2017 : add entry points to mimic view
// VERSION : 1.1.2 : DM : #6129 : 04/05/2017 : merge dev on mimic branch
// VERSION : 1.1.2 : DM : #6785 : 31/05/2017 : Add Misc/links in view editor
// VERSION : 1.1.2 : DM : #6129 : 31/05/2017 : add digital display feature and fix lint warnings
// VERSION : 1.1.2 : DM : #6785 : 06/06/2017 : Fix links in mimic view
// VERSION : 1.1.2 : DM : #6129 : 10/07/2017 : MimicView editor rc-collapse implementation + fixes on Plot and Text editors too.
// VERSION : 1.1.2 : FA : #7256 : 25/07/2017 : Added top title in editor with colored vignette.
// VERSION : 1.1.2 : FA : #7145 : 27/07/2017 : Fix renderer crash when titleStyle is missing
// VERSION : 1.1.2 : DM : #6700 : 03/08/2017 : Merge branch 'dev' into dbrugne-data
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 23/08/2017 : On Plot/Text/Mimic/Dynamic editors: Save and Reload buttons beneath the title.
// VERSION : 1.1.2 : FA : #7753 : 19/09/2017 : MimicTab editor component uses rc-collapse instead of bootstrap collapse.
// END-HISTORY
// ====================================================================

/* eslint-disable */

import React, { Component, PropTypes } from 'react';
import Navbar from 'viewManager/commonEditor/Navbar/Navbar';
import EntryPointTree from 'viewManager/common/Components/Editor/EntryPointTree';
import EntryPointActions from 'viewManager/commonEditor/EntryPoint/EntryPointActions';
import ReloadAndSaveViewButtonsContainer from 'viewManager/commonEditor/ReloadAndSaveViewButtonsContainer';
import { Misc } from 'viewManager/commonEditor/Misc';
import styles from '../../../commonEditor/Editor.css';
import MimicTabContainer from './MimicTabContainer';

const newEntryPoint = {
  name: 'NewEntryPoint',
  connectedData: {}
};

const navBarItems = ['Entry Points', 'Mimic', 'Misc'];

export default class Editor extends Component {
  static propTypes = {
    viewId: PropTypes.string.isRequired,
    // actions
    addEntryPoint: PropTypes.func.isRequired,
    removeEntryPoint: PropTypes.func.isRequired,
    title: PropTypes.string,
    titleStyle: PropTypes.shape(),
    updateTitle: PropTypes.func.isRequired,
    updateTitleStyle: PropTypes.func.isRequired,
    openModal: PropTypes.func.isRequired,
    configuration: PropTypes.shape({
      entryPoints: PropTypes.array,
      content: PropTypes.string.isRequired,
    }),
    updateViewPanels: PropTypes.func.isRequired,
    panels: PropTypes.shape({}).isRequired,
    tab: PropTypes.number,
    entryPointsPanels: PropTypes.shape({}).isRequired,
  };

  static defaultProps = {
    titleStyle: {},
    tab: null,
    title: '',
  }

  state = { search: '' };

  addEntryPoint = (values) => {
    const { addEntryPoint, viewId } = this.props;
    addEntryPoint(
      viewId,
      {
        ...newEntryPoint,
        ...values,
      }
    );
  }

  removeEntryPoint = (key) => {
    const { removeEntryPoint, viewId } = this.props;
    removeEntryPoint(viewId, key);
  }

  handleTextTitle = (newVal) => {
    const { updateTitle, viewId } = this.props;
    updateTitle(viewId, newVal);
  }

  handleTextTitleStyle = (label, newVal) => {
    const { configuration, updateTitleStyle, viewId } = this.props;
    updateTitleStyle(viewId, {
      ...configuration.titleStyle,
      [label]: newVal
    });
  }

  changeSearch = s => this.setState({ search: s });

  changeCurrentDisplay = (id) => {
    const { updateViewTab, viewId } = this.props;
    updateViewTab(viewId, id);
  }

  render() {
    const { currentDisplay, search } = this.state;
    const {
      entryPointsPanels,
      closeEditor,
      updateTitleStyle,
      updateTitle,
      openModal,
      tab,
      viewId,
      titleStyle,
      title,
      configuration: {
        entryPoints,
      },
      updateViewPanels,
      panels,
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
          closeEditor={closeEditor}
        />
        <div className={styles.content}>
          {(tab === 0 || tab === null) && <div>
            <EntryPointActions
              changeSearch={this.changeSearch}
              openModal={openModal}
              viewId={viewId}
              viewType="MimicView"
              search={search}
            />
            <EntryPointTree
              viewId={viewId}
              entryPoints={entryPoints}
              entryPointsPanels={entryPointsPanels}
              updateViewPanels={updateViewPanels}
              search={search}
              remove={this.removeEntryPoint}
            />
          </div>}
          {tab === 1 &&
            <MimicTabContainer
              panels={panels}
              viewId={viewId}
              updateViewPanels={updateViewPanels}
            />
          }
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
