import React, { Component } from 'react';
import _get from 'lodash/get';
import PropTypes from 'prop-types';
import Navbar from 'viewManager/commonEditor/Navbar/Navbar';
import { Misc } from 'viewManager/commonEditor/Misc';
import ReloadAndSaveViewButtonsContainer from 'viewManager/commonEditor/ReloadAndSaveViewButtonsContainer';
import styles from 'viewManager/commonEditor/Editor.css';
import WithForm from 'viewManager/common/Hoc/WithForm';
import DefaultPusDataContainer from 'viewManager/commonEditor/DefaultPusDataContainer';
import { entryPointType, TableConfigurationColumnType } from '../../../common/Components/types';
import PUS05TabContainer from './PUS05TabContainer';

const navItems = ['Connected Data', 'View', 'Misc'];
const { string, number, bool, shape, func, arrayOf } = PropTypes;

export default class PUS05Editor extends Component {
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
      entryPoints: arrayOf(entryPointType),
      tables: shape({
        onBoardEvents: shape({
          cols: arrayOf(TableConfigurationColumnType).isRequired,
        }).isRequired,
        receivedOnBoardEvents: shape({
          cols: arrayOf(TableConfigurationColumnType).isRequired,
        }).isRequired,
      }).isRequired,
    }).isRequired,
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

  /**
   * empty form in the state
   * this form will be fill in componentWillReceiveProps with initial values
   */
  state = {
    PUS05EditorForm: WithForm(DefaultPusDataContainer),
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.viewId !== this.props.viewId) {
      this.setState({
        PUS05EditorForm: WithForm(DefaultPusDataContainer),
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
    });
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
    } = this.props;
    const initialValues = _get(this.props, ['configuration', 'entryPoints', 0], {});

    const { PUS05EditorForm } = this.state;
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
            <PUS05EditorForm
              viewId={viewId}
              pageId={pageId}
              form={`entrypoint-connectedData-form-${viewId}`}
              onSubmit={this.handleSubmit}
              initialValues={initialValues}
            />
          </div>}
          {
            tab === 1 &&
            <PUS05TabContainer
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
