// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #3622 : 09/03/2017 : Moving the editor files in viewManager, splitting
//  between commonEditor and commonReduxForm.
// VERSION : 1.1.2 : DM : #3622 : 14/03/2017 : Move general variables at top level of a view
// VERSION : 1.1.2 : DM : #6302 : 06/04/2017 : Fix some lint errors, added justification and DV6
//  TBC_CNES prefix on others.
// VERSION : 1.1.2 : DM : #5828 : 13/04/2017 : EntryPoint addition now uses GenericModal. General
//  refacto of default EntryPoints props, set in viewManager's setDefaultEntryPoint for text, plot
//  and Dynamic.
// VERSION : 1.1.2 : DM : #5828 : 18/04/2017 : open parameter in editor via context menu
// VERSION : 1.1.2 : DM : #5828 : 27/04/2017 : Uniforming new EP process for PlotView and textView.
//  Fot PlotView EP, user might choose unit and axis in form to prevent VIMA from auto-creating Y
//  axis.
// VERSION : 1.1.2 : DM : #5828 : 28/04/2017 : No vertical bar when editor minimized.
// VERSION : 1.1.2 : DM : #5828 : 09/05/2017 : Main tab is stored in store for Dynamic Plot & Text.
//  state.ui
// VERSION : 1.1.2 : DM : #5828 : 09/05/2017 : Plot & Text editor panels and sub-panels are stored
//  in store.
// VERSION : 1.1.2 : DM : #5828 : 10/05/2017 : Plot & Text editor panels and sub-panels are stored
//  in store.
// VERSION : 1.1.2 : DM : #5828 : 10/05/2017 : Main tab is stored in store for Dynamic Plot & Text.
//  state.ui
// VERSION : 1.1.2 : DM : #6785 : 31/05/2017 : Add Misc/links in view editor
// VERSION : 1.1.2 : FA : #7256 : 25/07/2017 : Added top title in editor with colored vignette.
// VERSION : 1.1.2 : FA : #7145 : 27/07/2017 : Fix renderer crash when titleStyle is missing
// VERSION : 1.1.2 : DM : #6700 : 03/08/2017 : Merge branch 'dev' into dbrugne-data
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 23/08/2017 : On Plot/Text/Mimic/Dynamic editors: Save and
//  Reload buttons beneath the title.
// VERSION : 2.0.0 : FA : #9494 : 01/12/2017 : Regression in View Editor ( domain ) // move
//  TextView common components to dedicated folder
// VERSION : 2.0.0 : DM : #5806 : 06/12/2017 : Change all relative imports .
// END-HISTORY
// ====================================================================

import React, { Component, PropTypes } from 'react';
import Navbar from 'viewManager/commonEditor/Navbar/Navbar';
import ReloadAndSaveViewButtonsContainer from 'viewManager/commonEditor/ReloadAndSaveViewButtonsContainer';
import { Misc } from 'viewManager/commonEditor/Misc';
import styles from 'viewManager/commonEditor/Editor.css';
import TextTabContainer from 'viewManager/TextView/Components/Editor/TextTabContainer';
import DataViewEntryPointsContainer from 'viewManager/commonEditor/EntryPoint/DataViewEntryPointsContainer';

const navBarItems = ['Entry Points', 'Text', 'Misc'];
const { string, number, func, shape, array } = PropTypes;

export default class Editor extends Component {
  static propTypes = {
    search: string,
    viewId: string.isRequired,
    pageId: string.isRequired,
    // from container mapStateToProps
    title: string,
    titleStyle: shape(),
    configuration: shape({
      entryPoints: array,
    }).isRequired,
    panels: shape({}).isRequired,
    tab: number,
    // from container mapDispatchToProps
    openModal: func.isRequired,
    updateViewTab: func.isRequired,
    updateViewPanels: func.isRequired,
  };
  static defaultProps = {
    titleStyle: {},
    tab: null,
    title: '',
    search: null,
  };
  changeCurrentDisplay = (id) => {
    const { updateViewTab, viewId } = this.props;
    updateViewTab(viewId, id);
  };
  render() {
    const {
      openModal,
      tab,
      viewId,
      pageId,
      search,
      panels,
      title,
      updateViewPanels,
      configuration: {
        entryPoints,
      },
    } = this.props;

    return (
      <div className={styles.contentWrapper}>
        <h4
          className="text-center mb10"
        >
          <span className="mr5 EditorVignette" />
          <b>{title}</b>
        </h4>
        <ReloadAndSaveViewButtonsContainer viewId={viewId} />
        <Navbar
          currentDisplay={tab === null ? 0 : tab}
          items={navBarItems}
          changeCurrentDisplay={this.changeCurrentDisplay}
        />
        <div className={styles.content}>
          {(tab === 0 || tab === null) && <div>
            <DataViewEntryPointsContainer
              entryPoints={entryPoints}
              viewId={viewId}
              pageId={pageId}
              search={search}
              viewType={'TextView'}
            />
          </div>}
          {
            tab === 1 &&
            <TextTabContainer
              viewId={viewId}
              updateViewPanels={updateViewPanels}
              panels={panels}
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
