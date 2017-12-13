// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #3622 : 09/03/2017 : Moving the editor files in viewManager, splitting between commonEditor and commonReduxForm.
// VERSION : 1.1.2 : DM : #3622 : 14/03/2017 : Move general variables at top level of a view
// VERSION : 1.1.2 : DM : #5828 : 24/03/2017 : PlotView: x axis is always time/s , not editable. Newly created Ep always stick to time axis or create one.
// VERSION : 1.1.2 : DM : #5828 : 03/04/2017 : PlotView EntryPoint refacto: connectedData instead of connectedDataX and connectedDataY.
// VERSION : 1.1.2 : DM : #5828 : 13/04/2017 : EntryPoint addition now uses GenericModal. General refacto of default EntryPoints props, set in viewManager's setDefaultEntryPoint for text, plot and Dynamic.
// VERSION : 1.1.2 : DM : #5828 : 18/04/2017 : open parameter in editor via context menu
// VERSION : 1.1.2 : DM : #5828 : 27/04/2017 : Uniforming new EP process for PlotView and textView. Fot PlotView EP, user might choose unit and axis in form to prevent VIMA from auto-creating Y axis.
// VERSION : 1.1.2 : DM : #5828 : 28/04/2017 : No vertical bar when editor minimized.
// VERSION : 1.1.2 : DM : #5828 : 05/05/2017 : General Editor Refacto : using GenericModal, using rc-collapse module instead of bootstrap accordion.
// VERSION : 1.1.2 : DM : #5828 : 09/05/2017 : Main tab is stored in store for Dynamic Plot & Text. state.ui
// VERSION : 1.1.2 : DM : #5828 : 09/05/2017 : Plot & Text editor panels and sub-panels are stored in store.
// VERSION : 1.1.2 : DM : #5828 : 10/05/2017 : General Editor Refacto : using GenericModal, using rc-collapse module instead of bootstrap accordion.
// VERSION : 1.1.2 : DM : #5828 : 10/05/2017 : Plot & Text editor panels and sub-panels are stored in store.
// VERSION : 1.1.2 : DM : #5828 : 10/05/2017 : Main tab is stored in store for Dynamic Plot & Text. state.ui
// VERSION : 1.1.2 : DM : #6785 : 31/05/2017 : Add Misc/links in view editor
// VERSION : 1.1.2 : FA : #7256 : 25/07/2017 : Added top title in editor with colored vignette.
// VERSION : 1.1.2 : FA : #7145 : 27/07/2017 : Fix renderer crash when titleStyle is missing
// VERSION : 1.1.2 : DM : #6700 : 03/08/2017 : Merge branch 'dev' into dbrugne-data
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 23/08/2017 : On Plot/Text/Mimic/Dynamic editors: Save and Reload buttons beneath the title.
// END-HISTORY
// ====================================================================

import React, { Component, PropTypes } from 'react';
import Navbar from 'viewManager/commonEditor/Navbar/Navbar';
import { Misc } from 'viewManager/commonEditor/Misc';
import EntryPointActions from 'viewManager/commonEditor/EntryPoint/EntryPointActions';
import ReloadAndSaveViewButtonsContainer from 'viewManager/commonEditor/ReloadAndSaveViewButtonsContainer';
import PlotTab from './PlotTab';
import EntryPointTree from './EntryPointTree';
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
    titleStyle: PropTypes.shape(),
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
    titleStyle: {},
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
        <ReloadAndSaveViewButtonsContainer viewId={viewId} />
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
