import React, { Component, PropTypes } from 'react';
import styles from '../Editor.css';
import Navbar from './Navbar';
import EntryPointTree from './EntryPointTree';
import EntryPointActions from './EntryPointActions';

export default class Editor extends Component {
  static propTypes = {
    closeEditor: PropTypes.func.isRequired,
    entryPoints: PropTypes.array,
    links: PropTypes.array,
    defaultRatio: PropTypes.array,
    content: PropTypes.object,
  };
  constructor(...args) {
    super(...args);
    this.state = { currentDisplay: 0, search: '' };
    this.changeCurrentDisplay = this.changeCurrentDisplay.bind(this);
    this.changeSearch = this.changeSearch.bind(this);
  }
  render() {
    console.log(this.props);
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
                entryPoints={this.props.entryPoints}
                search={this.state.search}
              />
            </div>
           :
            null
        }
      </div>
    );
  }
  changeSearch(s) {
    this.setState({ search: s });
  }
  changeCurrentDisplay(id) {
    this.setState({ currentDisplay: id });
  }
}
