/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Navbar from 'viewManager/commonEditor/Navbar/Navbar';
import { Misc } from 'viewManager/commonEditor/Misc';
import ReloadAndSaveViewButtonsContainer from 'viewManager/commonEditor/ReloadAndSaveViewButtonsContainer';
import styles from 'viewManager/commonEditor/Editor.css';
import WithForm from 'viewManager/common/Hoc/WithForm';
import DefaultPusDataContainer from 'viewManager/commonEditor/DefaultPusDataContainer';
import { TableConfigurationColumnType } from '../../../common/Components/types';
import PUS11TabContainer from './PUS11TabContainer';

const navItems = ['Connected Data', 'View', 'Misc'];
const { string, number, bool, shape, func, arrayOf } = PropTypes;

export default class PUS11Editor extends Component {
  static propTypes = {
    // own props
    viewId: string.isRequired,
    pageId: string.isRequired,
    // Container's mapStateToProps
    title: string,
    titleStyle: shape({
      align: string,
      bgColor: string,
      bold: bool,
      color: string,
      font: string,
      italic: bool,
      size: number,
      strikeOut: bool,
      underline: bool,
    }),
    configuration: shape({
      tables: shape({
        subSchedules: shape({
          cols: arrayOf(TableConfigurationColumnType).isRequired,
        }).isRequired,
        enabledApids: shape({
          cols: arrayOf(TableConfigurationColumnType).isRequired,
        }).isRequired,
        commands: shape({
          cols: arrayOf(TableConfigurationColumnType).isRequired,
        }).isRequired,
      }).isRequired,
    }).isRequired,
    tab: number,
    panels: shape({}).isRequired,
    // Container's mapDispatchToProps
    updateViewTab: func.isRequired,
    updateViewPanels: func.isRequired,
    openModal: func.isRequired,
  };

  static defaultProps = {
    titleStyle: {},
    tab: null,
    title: '',
  };

  /**
   * empty form in the state
   * this form will be fill in componentWillReceiveProps with initial values
   */
  state = {
    PUS11EditorForm: WithForm(DefaultPusDataContainer),
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.viewId !== this.props.viewId) {
      this.setState({
        PUS11EditorForm: WithForm(DefaultPusDataContainer),
      });
    }
  }

  changeCurrentDisplay = (id) => {
    const { updateViewTab, viewId } = this.props;
    updateViewTab(viewId, id);
  };

  // @todo finalize updatePusData implementation
  handleSubmit = (values) => {
    // const { configuration, updatePusData, viewId } = this.props;
    // const entryPoint = _get(configuration, ['entryPoints', 0]);
    // updatePusData(viewId, entryPoint.id, {
    //   ...entryPoint,
    //   ...values,
    // });
  };

  render() {
    const {
      viewId,
      pageId,
      tab,
      updateViewPanels,
      panels,
      openModal,
      title,
      titleStyle,
      configuration,
    } = this.props;
    const nullObject = {};
    const { PUS11EditorForm } = this.state;
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
          changeCurrentDisplay={this.changeCurrentDisplay}
          items={navItems}
        />
        <div className={styles.content}>
          {(tab === 0 || tab === null) && <div className={styles.content}>
            <PUS11EditorForm
              viewId={viewId}
              pageId={pageId}
              form={`entrypoint-connectedData-form-${viewId}`}
              onSubmit={values => this.handleSubmit({ connectedData: values })}
              initialValues={nullObject}
            />
          </div>}
          {
            tab === 1 &&
            <PUS11TabContainer
              viewId={viewId}
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
