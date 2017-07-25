import React, { Component, PropTypes } from 'react';
import Navbar from '../../../commonEditor/Navbar/Navbar';
import PlotTab from './PlotTab';
import { Misc } from '../../../commonEditor/Misc';
import EntryPointTree from './EntryPointTree';
import EntryPointActions from '../../../commonEditor/EntryPoint/EntryPointActions';
import styles from '../../../commonEditor/Editor.css';

const navbarItems = ['Entry Points', 'Plot', 'Misc'];

export default class PlotEditor extends Component {
  static propTypes = {
    openModal: PropTypes.func.isRequired,
    updateViewTab: PropTypes.func.isRequired,
    updateViewPanels: PropTypes.func.isRequired,
    removeEntryPoint: PropTypes.func.isRequired,
    updateEditorSearch: PropTypes.func.isRequired,
    panels: PropTypes.shape({}).isRequired,
    entryPointsPanels: PropTypes.shape({}).isRequired,
    tab: PropTypes.number,
    viewId: PropTypes.string.isRequired,
    title: PropTypes.string,
    titleStyle: PropTypes.shape().isRequired,
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

  static defaultProps = {
    tab: null,
    links: [],
    title: '',
  }

  removeEntryPoint = (key) => {
    const { removeEntryPoint, viewId } = this.props;
    removeEntryPoint(viewId, key);
  }

  changeSearch = s => this.props.updateEditorSearch(s);

  changeCurrentDisplay = (id) => {
    const { updateViewTab, viewId } = this.props;
    updateViewTab(viewId, id);
  }

  render() {
    const {
      openModal,
      tab,
      panels,
      entryPointsPanels,
      viewId,
      updateViewPanels,
      title,
      titleStyle,
      configuration: {
        entryPoints,
        axes,
        grids,
        markers,
        search,
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
        <Navbar
          currentDisplay={tab === null ? 0 : tab}
          items={navbarItems}
          changeCurrentDisplay={this.changeCurrentDisplay}
        />
        <div className={styles.content}>
          {
            (tab === 0 || tab === null) &&
              [
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
                  entryPointsPanels={entryPointsPanels}
                  updateViewPanels={updateViewPanels}
                  search={search}
                  remove={this.removeEntryPoint}
                  viewId={viewId}
                />,
              ]
          }
          {
            tab === 1 &&
            <PlotTab
              axes={axes}
              markers={markers}
              grids={grids}
              titleStyle={titleStyle}
              openModal={openModal}
              updateViewPanels={updateViewPanels}
              panels={panels}
              viewId={viewId}
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
