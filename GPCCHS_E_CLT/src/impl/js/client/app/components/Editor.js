import React, { Component, PropTypes } from 'react';
import Navbar from './Editor/Navbar';
import PlotTab from './Editor/PlotTab';
import EntryPointTree from './Editor/EntryPointTree';
import styles from './Editor.css';

export default class Editor extends Component {
  static propTypes = {
    closeEditor: PropTypes.func.isRequired,
    configuration: PropTypes.any,
  }
  constructor(...args) {
    super(...args);
    this.state = { currentDisplay: 0 };
    this.changeCurrentDisplay = this.changeCurrentDisplay.bind(this);
  }
  changeCurrentDisplay(id) {
    this.setState({ currentDisplay: id });
  }
  render() {
    return (
      <div className={styles.editor}>
        <Navbar
          currentDisplay={this.state.currentDisplay}
          items={['Entry Points', 'Plot', 'Misc']}
          changeCurrentDisplay={this.changeCurrentDisplay}
          closeEditor={this.props.closeEditor}
        />
        {(this.state.currentDisplay === 1) ? <PlotTab /> : null}
        {(this.state.currentDisplay === 0) ? <EntryPointTree entryPoints={this.props.configuration.attributes.plotViewEntryPoints} /> : null}
      </div>
    );
  }
}
