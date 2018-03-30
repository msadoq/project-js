import _get from 'lodash/get';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Navbar from 'viewManager/commonEditor/Navbar/Navbar';
import { Misc } from 'viewManager/commonEditor/Misc';
import ReloadAndSaveViewButtonsContainer from 'viewManager/commonEditor/ReloadAndSaveViewButtonsContainer';
import GroundAlarmEditorForm from './GroundAlarmEditorForm';
import styles from '../../../commonEditor/Editor.css';
import GroundAlarmTab from './GroundAlarmTab';

const navItems = ['Connected Data', 'View', 'Misc'];

const { string, number, bool, arrayOf, shape, array, func } = PropTypes;

export default class GroundAlarmEditor extends Component {
  static propTypes = {
    // own props
    viewId: string.isRequired,
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
      entryPoints: array,
    }).isRequired,
    timelines: arrayOf(shape({})).isRequired,
    domains: arrayOf(shape({})).isRequired,
    tab: number,
    panels: shape({}).isRequired,
    // Container's mapDispatchToProps
    updateEntryPoint: func.isRequired,
    updateViewTab: func.isRequired,
    updateViewPanels: func.isRequired,
    openModal: func.isRequired,
  };

  static defaultProps = {
    titleStyle: {},
    tab: null,
    title: '',
  };

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
    });
  };

  render() {
    const { entryPoints } = this.props.configuration;
    const {
      timelines,
      viewId,
      tab,
      domains,
      updateViewPanels,
      panels,
      openModal,
      title,
      titleStyle,
    } = this.props;
    const nullObject = {};
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
            <GroundAlarmEditorForm
              domains={domains}
              timelines={timelines}
              form={`entrypoint-connectedData-form-${viewId}`}
              onSubmit={values => this.handleSubmit({ connectedData: values })}
              initialValues={entryPoints.length ? entryPoints[0].connectedData : nullObject}
            />
          </div>}
          {tab === 1 && <GroundAlarmTab />}
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
