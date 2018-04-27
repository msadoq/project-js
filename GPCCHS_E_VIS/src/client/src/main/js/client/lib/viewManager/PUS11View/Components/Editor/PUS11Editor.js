// import _get from 'lodash/get';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Navbar from 'viewManager/commonEditor/Navbar/Navbar';
import { Misc } from 'viewManager/commonEditor/Misc';
import ReloadAndSaveViewButtonsContainer from 'viewManager/commonEditor/ReloadAndSaveViewButtonsContainer';
import styles from 'viewManager/commonEditor/Editor.css';
import PUS11EditorForm from './PUS11EditorForm';

const navItems = ['Connected Data', 'View', 'Misc'];

const { string, number, bool, shape, func } = PropTypes;

export default class PUS11Editor extends Component {
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
    console.log('handleSubmit', values);
  };

  render() {
    const {
      viewId,
      tab,
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
            <PUS11EditorForm
              form={`entrypoint-connectedData-form-${viewId}`}
              onSubmit={values => this.handleSubmit({ connectedData: values })}
              initialValues={nullObject}
            />
          </div>}
          {
            tab === 1 &&
            <div>
              Display Configuration
            </div>
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
