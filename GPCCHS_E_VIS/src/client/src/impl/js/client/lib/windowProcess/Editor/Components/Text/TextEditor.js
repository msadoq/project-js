/* eslint-disable */

import React, { Component, PropTypes } from 'react';
import styles from '../../Editor.css';
import Navbar from '../Navbar/Navbar';
import EntryPointTree from '../EntryPoint/EntryPointTree';
import EntryPointActions from '../EntryPoint/EntryPointActions';
import TextTab from './TextTab';

const newEntryPoint = {
  name: 'NewEntryPoint',
  connectedData: {}
};

export default class Editor extends Component {
  static propTypes = {
    // actions
    updateEntryPoint: PropTypes.func.isRequired,
    addEntryPoint: PropTypes.func.isRequired,
    removeEntryPoint: PropTypes.func.isRequired,
    updateTitle: PropTypes.func.isRequired,
    updateTitleStyle: PropTypes.func.isRequired,

    closeEditor: PropTypes.func.isRequired,
    configuration: PropTypes.shape({
      title: PropTypes.string,
      type: PropTypes.string.isRequired,
      entryPoints: PropTypes.array,
      links: PropTypes.array,
      defaultRatio: PropTypes.shape({
        length: PropTypes.number,
        width: PropTypes.number
      }),
      content: PropTypes.string.isRequired,
      titleStyle: PropTypes.shape({
        font: PropTypes.string,
        size: PropTypes.number,
        bold: PropTypes.bool,
        italic: PropTypes.bool,
        underline: PropTypes.bool,
        strikeOut: PropTypes.bool,
        align: PropTypes.string,
        color: PropTypes.string
      })
    })
  };

  state = { currentDisplay: 0, search: '' };


  handleEntryPoint = (key, label, newVal) => {
    const { configuration, updateEntryPoint, viewId } = this.props;
    const currentEntryPoint = configuration[`entryPoints[${key}]`];
    updateEntryPoint(viewId, key, {
      ...currentEntryPoint,
      [label]: newVal
    });
  }
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
  handlePlotTitle = (newVal) => {
    const { updateTitle, viewId } = this.props;
    updateTitle(viewId, newVal);
  }
  handlePlotTitleStyle = (label, newVal) => {
    const { configuration, updateTitleStyle, viewId } = this.props;
    updateTitleStyle(viewId, {
      ...configuration.titleStyle,
      [label]: newVal
    });
  }

  changeSearch = s => this.setState({ search: s });
  changeCurrentDisplay = id => this.setState({ currentDisplay: id });

  render() {
    const { currentDisplay, search } = this.state;
    const {
      closeEditor,
      configuration: {
        entryPoints,
        title,
        titleStyle
      }
    } = this.props;

    return (
      <div className={styles.contentWrapper}>
        <Navbar
          currentDisplay={currentDisplay}
          items={['Entry Points', 'Text']}
          changeCurrentDisplay={this.changeCurrentDisplay}
          closeEditor={closeEditor}
        />
        <div className={styles.content}>
          {currentDisplay === 0 && <div>
            <EntryPointActions
              changeSearch={this.changeSearch}
              addEntryPoint={this.addEntryPoint}
            />
            <EntryPointTree
              entryPoints={entryPoints}
              handleEntryPoint={this.handleEntryPoint}
              search={search}
              remove={this.removeEntryPoint}
            />
          </div>}
          {currentDisplay === 1 && <TextTab
            title={title}
            handlePlotTitle={this.handlePlotTitle}
            handlePlotTitleStyle={this.handlePlotTitleStyle}
            titleStyle={titleStyle}
          />}
        </div>
      </div>
    );
  }
}
