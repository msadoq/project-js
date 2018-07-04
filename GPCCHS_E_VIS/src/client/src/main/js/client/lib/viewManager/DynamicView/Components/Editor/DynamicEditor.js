// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #3622 : 09/03/2017 : Moving the editor files in viewManager, splitting
//  between commonEditor and commonReduxForm.
// VERSION : 1.1.2 : DM : #3622 : 14/03/2017 : Move general variables at top level of a view
// VERSION : 1.1.2 : DM : #5828 : 23/03/2017 : Remove obsolete code from project
// VERSION : 1.1.2 : DM : #5828 : 24/03/2017 : Remove obsolete code from project
// VERSION : 1.1.2 : DM : #5828 : 28/04/2017 : No vertical bar when editor minimized.
// VERSION : 1.1.2 : DM : #5828 : 09/05/2017 : Main tab is stored in store for Dynamic Plot & Text.
//  state.ui
// VERSION : 1.1.2 : DM : #5828 : 10/05/2017 : Main tab is stored in store for Dynamic Plot & Text.
//  state.ui
// VERSION : 1.1.2 : DM : #5828 : 10/05/2017 : In Text Plot and Dynamic, domain is a dropdown list
//  of available domains, timeline is not a free dropdown anymore.
// VERSION : 1.1.2 : DM : #6785 : 31/05/2017 : Add Misc/links in view editor
// VERSION : 1.1.2 : FA : #7256 : 25/07/2017 : Added top title in editor with colored vignette.
// VERSION : 1.1.2 : FA : #7145 : 27/07/2017 : Fix renderer crash when titleStyle is missing
// VERSION : 1.1.2 : DM : #6700 : 03/08/2017 : Merge branch 'dev' into dbrugne-data
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 23/08/2017 : On Plot/Text/Mimic/Dynamic editors: Save and
//  Reload buttons beneath the title.
// VERSION : 2.0.0 : FA : #8088 : 24/10/2017 : Fixed DynamicView editor, submit is now
//  operationnal.
// VERSION : 2.0.0 : DM : #5806 : 06/12/2017 : Change all relative imports .
// VERSION : 2.0.0 : FA : #11620 : 06/04/2018 : remove domain and timeline from form field, but
//  keeps the value (always '*') persisted
// VERSION : 2.0.0.3 : FA : ISIS-FT-3086 : 15/05/2018 : editor's form bug on reintialize
// VERSION : 2.0.0.3 : FA : ISIS-FT-3086 : 30/05/2018 : editor's form bug on reintialize
// VERSION : 2.0.0.3 : FA : ISIS-FT-3174 : 30/05/2018 : disable background color on view header for
//  multisat handle
// END-HISTORY
// ====================================================================

import _get from 'lodash/get';
import React, { PropTypes, Component } from 'react';
import Navbar from 'viewManager/commonEditor/Navbar/Navbar';
import { Misc } from 'viewManager/commonEditor/Misc';
import ReloadAndSaveViewButtonsContainer from 'viewManager/commonEditor/ReloadAndSaveViewButtonsContainer';
import WithForm from 'viewManager/common/Hoc/WithForm';
import DynamicViewEntryPointsContainer from 'viewManager/commonEditor/EntryPoint/DynamicViewEntryPointsContainer';
// import { buildFormula } from 'viewManager/common';
import styles from 'viewManager/commonEditor/Editor.css';
import DynamicTab from 'viewManager/DynamicView/Components/Editor/DynamicTab';

const navItems = ['Connected Data', 'View', 'Misc'];
const { string, number, bool, func, shape, array } = PropTypes;

export default class DynamicEditor extends Component {
  static propTypes = {
    viewId: string.isRequired,
    pageId: string.isRequired,
    tab: number,
    titleStyle: shape({
      align: string,
      bold: bool,
      color: string,
      font: string,
      italic: bool,
      size: number,
      strikeOut: bool,
      underline: bool,
    }),
    title: string,
    configuration: shape({
      entryPoints: array,
    }).isRequired,
    updateEntryPoint: func.isRequired,
    updateViewTab: func.isRequired,
    updateViewPanels: func.isRequired,
    openModal: func.isRequired,
    panels: shape({}).isRequired,
  };

  static defaultProps = {
    titleStyle: {},
    tab: null,
    title: '',
  };

  /**
   * empty form in the state
   * this form will be fill in componentWillReceiveProps with initial values
   * TODO jmira voir avec Yann et Jean si ce fonctionnement convient (redondance)
   */
  state = {
    DynamicViewEntryPointsWithForm: WithForm(DynamicViewEntryPointsContainer),
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.viewId !== this.props.viewId) {
      this.setState({
        DynamicViewEntryPointsWithForm: WithForm(DynamicViewEntryPointsContainer),
      });
    }
  }

  changeCurrentDisplay = (id) => {
    const { updateViewTab, viewId } = this.props;
    updateViewTab(viewId, id);
  };

  handleSubmit = (values) => {
    const { configuration, updateEntryPoint, viewId } = this.props;
    const entryPoint = _get(configuration, ['entryPoints', 0]);
    updateEntryPoint(viewId, entryPoint.id, {
      ...entryPoint,
      ...values,
      connectedData: {
        ...values.connectedData,
        // formula: buildFormula( // @todo uncomment and remove formula field
        //   values.connectedData.catalog,
        //   values.connectedData.catalogItem,
        //   values.connectedData.comObject,
        //   values.connectedData.comObjectField
        // ),
      },
    });
  };

  render() {
    const { entryPoints } = this.props.configuration;
    const {
      viewId,
      pageId,
      tab,
      updateViewPanels,
      panels,
      openModal,
      title,
    } = this.props;
    const nullObject = {};
    const initialValues = entryPoints.length
      ? {
        ...entryPoints[0].connectedData,
        domain: '*',
        timeline: '*',
      }
      : nullObject;

    /**
     * get form from the state
     */
    const { DynamicViewEntryPointsWithForm } = this.state;

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
          changeCurrentDisplay={this.changeCurrentDisplay}
          items={navItems}
        />
        <div className={styles.content}>
          {(tab === 0 || tab === null) && <div className={styles.content}>
            <DynamicViewEntryPointsWithForm
              viewId={viewId}
              pageId={pageId}
              form={`entrypoint-connectedData-form-${viewId}`}
              onSubmit={values => this.handleSubmit({ connectedData: values })}
              initialValues={initialValues}
            />
          </div>}
          {tab === 1 && <DynamicTab />}
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
