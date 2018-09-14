import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _set from 'lodash/fp/set';
import _flow from 'lodash/fp/flow';
import Navbar from 'viewManager/commonEditor/Navbar/Navbar';
import { Misc } from 'viewManager/commonEditor/Misc';
import ReloadAndSaveViewButtonsContainer from 'viewManager/commonEditor/ReloadAndSaveViewButtonsContainer';
import WithForm from 'viewManager/common/Hoc/WithForm';
import DecommutedPacketViewEntryPointsContainer from 'viewManager/commonEditor/EntryPoint/DecommutedPacketViewEntryPointsContainer';
import { handleSubmit } from 'viewManager/common';
import styles from 'viewManager/commonEditor/Editor.css';
import DecommutedPacketTab from 'viewManager/DecommutedPacketView/Components/Editor/DecommutedPacketTab';
import { entryPointType } from 'viewManager/common/Components/types';
import ErrorBoundary from 'viewManager/common/Components/ErrorBoundary';

import { TIME_BASED_DATA_OPTION } from '../../../commonEditor/Fields/DataTypeField';

const navItems = ['Connected Data', 'View', 'Misc'];

export default class DecommutedPacketEditor extends Component {
  static propTypes = {
    viewId: PropTypes.string.isRequired,
    pageId: PropTypes.string.isRequired,
    tab: PropTypes.number,
    titleStyle: PropTypes.shape({
      align: PropTypes.string,
      bgColor: PropTypes.string,
      bold: PropTypes.bool,
      color: PropTypes.string,
      font: PropTypes.string,
      italic: PropTypes.bool,
      size: PropTypes.number,
      strikeOut: PropTypes.bool,
      underline: PropTypes.bool,
    }),
    title: PropTypes.string,
    configuration: PropTypes.shape({
      entryPoints: PropTypes.arrayOf(entryPointType),
    }).isRequired,
    updateEntryPoint: PropTypes.func.isRequired,
    updateViewTab: PropTypes.func.isRequired,
    updateViewPanels: PropTypes.func.isRequired,
    openModal: PropTypes.func.isRequired,
    panels: PropTypes.shape({}).isRequired,
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
    DecommutedPacketViewEntryPointsWithForm: WithForm(DecommutedPacketViewEntryPointsContainer),
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.viewId !== this.props.viewId) {
      this.setState({
        DecommutedPacketViewEntryPointsWithForm: WithForm(DecommutedPacketViewEntryPointsContainer),
      });
    }
  }

  changeCurrentDisplay = (id) => {
    const { updateViewTab, viewId } = this.props;
    updateViewTab(viewId, id);
  };

  handleSubmit = (values) => {
    const { updateEntryPoint, viewId } = this.props;
    const entryPoint = this.props.configuration.entryPoints[0];
    const timeBasedValues = _flow(
      _set('connectedData.dataType', TIME_BASED_DATA_OPTION.value),
      _set('name', 'decommutedPacketEP'),
      _set('id', entryPoint.id),
      _set('connectedData.comObject', 'DecommutedPacket')
    )(values);
    handleSubmit(timeBasedValues, updateEntryPoint, viewId);
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
      titleStyle,
    } = this.props;
    const nullObject = {};
    const initialValues = entryPoints.length
      ? {
        connectedData: {
          ...entryPoints[0].connectedData,
          domain: '*',
          timeline: '*',
          provider: '*',
        },
      }
      : nullObject;

    /**
     * get form from the state
     */
    const { DecommutedPacketViewEntryPointsWithForm } = this.state;

    return (
      <ErrorBoundary>
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
            changeCurrentDisplay={this.changeCurrentDisplay}
            items={navItems}
          />
          <div className={styles.content}>
            {(tab === 0 || tab === null) && <div className={styles.content}>
              <DecommutedPacketViewEntryPointsWithForm
                viewId={viewId}
                pageId={pageId}
                form={`entrypoint-connectedData-form-${viewId}`}
                onSubmit={values => this.handleSubmit(values)}
                initialValues={initialValues}
              />
            </div>}
            {tab === 1 && <DecommutedPacketTab />}
            {tab === 2 &&
            <Misc
              updateViewPanels={updateViewPanels}
              viewId={viewId}
              panels={panels}
              openModal={openModal}
            />}
          </div>
        </div>
      </ErrorBoundary>
    );
  }
}
