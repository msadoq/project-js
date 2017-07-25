/* eslint-disable */

import React, { Component, PropTypes } from 'react';
import styles from '../../../commonEditor/Editor.css';
import Navbar from '../../../commonEditor/Navbar/Navbar';
import EntryPointTree from './EntryPointTree';
import EntryPointActions from '../../../commonEditor/EntryPoint/EntryPointActions';
import MimicTabContainer from './MimicTabContainer';
import { Misc } from '../../../commonEditor/Misc';

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
    titleStyle: PropTypes.shape().isRequired,
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
          {tab === 1 && <MimicTabContainer />}
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
