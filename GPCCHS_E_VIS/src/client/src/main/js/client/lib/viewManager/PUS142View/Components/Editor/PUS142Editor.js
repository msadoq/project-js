import React, { Component } from 'react';
import _get from 'lodash/get';
import PropTypes from 'prop-types';
import Navbar from 'viewManager/commonEditor/Navbar/Navbar';
import { Misc } from 'viewManager/commonEditor/Misc';
import ReloadAndSaveViewButtonsContainer from 'viewManager/commonEditor/ReloadAndSaveViewButtonsContainer';
import styles from 'viewManager/commonEditor/Editor.css';
import WithForm from 'viewManager/common/Hoc/WithForm';
import DefaultPusDataContainer from 'viewManager/commonEditor/DefaultPusDataContainer';
import ErrorBoundary from 'viewManager/common/Components/ErrorBoundary';
import { VM_VIEW_PUS142 } from 'viewManager/constants';

import { entryPointType, TableConfigurationColumnType } from '../../../common/Components/types';
import PUS142TabContainer from './PUS142TabContainer';

const navItems = ['Connected Data', 'View', 'Misc'];

export default class PUS142Editor extends Component {
  static propTypes = {
    // own props
    viewId: PropTypes.string.isRequired,
    pageId: PropTypes.string.isRequired,
    // Container's mapStateToProps
    title: PropTypes.string,
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
    configuration: PropTypes.shape({
      entryPoints: PropTypes.arrayOf(entryPointType),
      tables: PropTypes.shape({
        onBoardStorages: PropTypes.shape({
          cols: PropTypes.arrayOf(TableConfigurationColumnType).isRequired,
        }).isRequired,
        storageDef: PropTypes.shape({
          cols: PropTypes.arrayOf(TableConfigurationColumnType).isRequired,
        }).isRequired,
      }).isRequired,
    }).isRequired,
    tab: PropTypes.number,
    panels: PropTypes.shape({}).isRequired,
    // Container's mapDispatchToProps
    updateEntryPoint: PropTypes.func.isRequired,
    updateViewTab: PropTypes.func.isRequired,
    updateViewPanels: PropTypes.func.isRequired,
    openModal: PropTypes.func.isRequired,
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
    PUS142EditorForm: WithForm(DefaultPusDataContainer),
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.viewId !== this.props.viewId) {
      this.setState({
        PUS142EditorForm: WithForm(DefaultPusDataContainer),
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

    const { PUS142EditorForm } = this.state;
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
              <PUS142EditorForm
                viewId={viewId}
                pageId={pageId}
                pusType={VM_VIEW_PUS142}
                form={`entrypoint-connectedData-form-${viewId}`}
                onSubmit={this.handleSubmit}
                initialValues={initialValues}
              />
            </div>}
            {
              tab === 1 &&
              <PUS142TabContainer
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
      </ErrorBoundary>
    );
  }
}
