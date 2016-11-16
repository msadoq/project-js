/* eslint-disable */

import React, { Component, PropTypes } from 'react';
import styles from '../../Editor.css';
import Navbar from '../Navbar';
import EntryPointTree from '../EntryPoint/EntryPointTree';
import EntryPointActions from '../EntryPoint/EntryPointActions';

export default class Editor extends Component {
  static propTypes = {
    closeEditor: PropTypes.func.isRequired,
    configuration: PropTypes.shape({
      entryPoints: PropTypes.array,
      links: PropTypes.array,
      defaultRatio: PropTypes.object,
      content: PropTypes.array
    })
  };

  state = { currentDisplay: 0, search: '' };

  changeSearch = s => this.setState({ search: s });
  changeCurrentDisplay = id => this.setState({ currentDisplay: id });

  render() {
    const { currentDisplay, search } = this.state;
    const {
      closeEditor,
      configuration: { entryPoints }
    } = this.props;

    return (
      <div className={styles.editor}>
        <Navbar
          currentDisplay={currentDisplay}
          items={['Entry Points', 'Text Editor', 'Miscs']}
          changeCurrentDisplay={this.changeCurrentDisplay}
          closeEditor={closeEditor}
        />
        {
          (currentDisplay === 0) ?
            <div>
              <EntryPointActions changeSearch={this.changeSearch} />
              <EntryPointTree
                entryPoints={entryPoints}
                search={search}
              />
            </div>
           :
            null
        }
      </div>
    );
  }
}
