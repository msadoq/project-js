import React, { Component, PropTypes } from 'react';
import Navbar from '../../../commonEditor/Navbar/Navbar';
import PlotTab from './PlotTab';
import { Misc } from '../../../commonEditor/Misc';
import EntryPointTree from './EntryPointTree';
import EntryPointActions from '../../../commonEditor/EntryPoint/EntryPointActions';
import styles from '../../../commonEditor/Editor.css';

const navbarItems = ['Entry Points', 'Plot'];

/*
  Composant racine de l'éditeur Plot.
*/
export default class PlotEditor extends Component {
  static propTypes = {
    // actions
    openModal: PropTypes.func.isRequired,
    removeEntryPoint: PropTypes.func.isRequired,
    updateEditorSearch: PropTypes.func.isRequired,
    // rest
    viewId: PropTypes.string.isRequired,
    configuration: PropTypes.shape({
      procedures: PropTypes.array,
      entryPoints: PropTypes.array,
      axes: PropTypes.object,
      grids: PropTypes.array,
      legend: PropTypes.object,
      markers: PropTypes.array,
      search: PropTypes.string,
    }).isRequired,
  };

  componentWillMount() {
    this.setState({
      currentDisplay: 0,
    });
  }

  removeEntryPoint = (key) => {
    const { removeEntryPoint, viewId } = this.props;
    removeEntryPoint(viewId, key);
  }

  changeSearch = s => this.props.updateEditorSearch(s);
  /*
    Appelée lorsque le un item de la navbar est cliqué.
    param id :
      0 : EntryPoints
      1 : PlotTab
      2 : Misc
  */
  changeCurrentDisplay = id => this.setState({ currentDisplay: id });

  render() {
    const { currentDisplay } = this.state;
    const {
      openModal,
      viewId,
      configuration: {
        entryPoints,
        axes,
        grids,
        title,
        titleStyle,
        markers,
        search,
      },
    } = this.props;
    return (
      <div className={styles.contentWrapper}>
        <Navbar
          currentDisplay={currentDisplay}
          items={navbarItems}
          changeCurrentDisplay={this.changeCurrentDisplay}
        />
        <div className={styles.content}>
          {currentDisplay === 2 && <Misc />}
          {currentDisplay === 1 && <PlotTab
            axes={axes}
            markers={markers}
            title={title}
            grids={grids}
            titleStyle={titleStyle}
            openModal={openModal}
            viewId={viewId}
          />}
          {currentDisplay === 0 && [
            <EntryPointActions
              key="EntryPointActions"
              viewId={viewId}
              viewType="PlotView"
              openModal={openModal}
              changeSearch={this.changeSearch}
              search={search}
            />,
            <EntryPointTree
              key="EntryPointTree"
              entryPoints={entryPoints}
              search={search}
              remove={this.removeEntryPoint}
            />,
          ]}
        </div>
      </div>
    );
  }
}
