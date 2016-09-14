import React, { Component, PropTypes } from 'react';
import styles from '../Editor.css';
import Navbar from './Navbar';
import EntryPointTree from './EntryPointTree';
import EntryPointActions from './EntryPointActions';

export default class Editor extends Component {
  static propTypes = {
    closeEditor: PropTypes.func.isRequired,
    configuration: PropTypes.any,
  }
  constructor(...args) {
    super(...args);
    this.state = { currentDisplay: 0, search: '' };
    this.changeCurrentDisplay = this.changeCurrentDisplay.bind(this);
    this.changeSearch = this.changeSearch.bind(this);
    console.log(this.props.configuration.attributes.TextViewEntryPoints);
  }
  changeSearch(s) {
    this.setState({ search: s });
  }
  changeCurrentDisplay(id) {
    this.setState({ currentDisplay: id });
  }
  render() {
    return (
      <div className={styles.editor}>
        <Navbar
          currentDisplay={this.state.currentDisplay}
          items={['Entry Points', 'Text Editor', 'Miscs']}
          changeCurrentDisplay={this.changeCurrentDisplay}
          closeEditor={this.props.closeEditor}
        />
        {
          (this.state.currentDisplay === 0) ?
            <div>
              <EntryPointActions changeSearch={this.changeSearch} />
              <EntryPointTree
                entryPoints={this.props.configuration.attributes.TextViewEntryPoints}
                search={this.state.search}
              />
            </div>
           :
            null
        }
      </div>
    );
  }
}
