import React, { Component, PropTypes } from 'react';
import styles from '../../../commonEditor/Editor.css';
import Navbar from '../../../commonEditor/Navbar/Navbar';
import EntryPointTree from './EntryPointTree';
import EntryPointActions from '../../../commonEditor/EntryPoint/EntryPointActions';
import TextTabContainer from './TextTabContainer';

const navBarItems = ['Entry Points', 'Text'];

export default class Editor extends Component {
  static propTypes = {
    viewId: PropTypes.string.isRequired,
    // actions
    openModal: PropTypes.func.isRequired,
    removeEntryPoint: PropTypes.func.isRequired,
    updateTitle: PropTypes.func.isRequired,
    updateTitleStyle: PropTypes.func.isRequired,

    updateEditorSearch: PropTypes.func.isRequired,
    closeEditor: PropTypes.func.isRequired,
    configuration: PropTypes.shape({
      entryPoints: PropTypes.array,
      content: PropTypes.string.isRequired,
      search: PropTypes.string,
    }).isRequired,
  };

  state = { currentDisplay: 0 };

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
      [label]: newVal,
    });
  }

  changeSearch = s => this.props.updateEditorSearch(s);
  changeCurrentDisplay = id => this.setState({ currentDisplay: id });

  render() {
    const { currentDisplay } = this.state;
    const {
      closeEditor,
      openModal,
      viewId,
      configuration: {
        entryPoints,
        search,
      },
    } = this.props;

    return (
      <div className={styles.contentWrapper}>
        <Navbar
          currentDisplay={currentDisplay}
          items={navBarItems}
          changeCurrentDisplay={this.changeCurrentDisplay}
          closeEditor={closeEditor}
        />
        <div className={styles.content}>
          {currentDisplay === 0 && <div>
            <EntryPointActions
              changeSearch={this.changeSearch}
              openModal={openModal}
              viewId={viewId}
              viewType="TextView"
              search={search}
            />
            <EntryPointTree
              entryPoints={entryPoints}
              search={search}
              remove={this.removeEntryPoint}
            />
          </div>}
          {currentDisplay === 1 && <TextTabContainer />}
        </div>
      </div>
    );
  }
}
