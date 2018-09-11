import _ from 'lodash/fp';
import _getOr from 'lodash/fp/getOr';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Navbar from 'viewManager/commonEditor/Navbar/Navbar';
import { Misc } from 'viewManager/commonEditor/Misc';
import ReloadAndSaveViewButtonsContainer
  from 'viewManager/commonEditor/ReloadAndSaveViewButtonsContainer';
import ErrorBoundary from 'viewManager/common/Components/ErrorBoundary';

import styles from '../../../commonEditor/Editor.css';
import GroundAlarmTabContainer from './GroundAlarmTabContainer';
import WithForm from '../../../common/Hoc/WithForm';
import AlarmViewEntryPoints from '../../../commonEditor/EntryPoint/AlarmViewEntryPoints';
import { TableConfigurationColumnType } from '../../../common/Components/types';

const navItems = ['Connected Data', 'View', 'Misc'];

export default class GroundAlarmEditor extends Component {
  static propTypes = {
    // own props
    viewId: PropTypes.string.isRequired,
    // Container's mapStateToProps
    title: PropTypes.string,
    configuration: PropTypes.shape({
      entryPoints: PropTypes.array,
      tables: PropTypes.shape({
        main: PropTypes.shape({
          cols: PropTypes.arrayOf(TableConfigurationColumnType).isRequired,
        }).isRequired,
      }).isRequired,
    }).isRequired,
    tab: PropTypes.number,
    panels: PropTypes.shape({}).isRequired,
    // Container's mapDispatchToProps
    updateAlarmMode: PropTypes.func.isRequired,
    updateViewTab: PropTypes.func.isRequired,
    updateViewPanels: PropTypes.func.isRequired,
    openModal: PropTypes.func.isRequired,
  };

  static defaultProps = {
    tab: null,
    title: '',
  };

  /**
   * empty form in the state
   * this form will be fill in componentWillReceiveProps with initial values
   * TODO jmira voir avec Yann et Jean si ce fonctionnement convient (redondance)
   */
  state = {
    GroundAlarmEditorForm: WithForm(AlarmViewEntryPoints),
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.viewId !== this.props.viewId) {
      this.setState({
        GroundAlarmEditorForm: WithForm(AlarmViewEntryPoints),
      });
    }
  }

  changeCurrentDisplay = (id) => {
    const { updateViewTab, viewId } = this.props;
    updateViewTab(viewId, id);
  };

  handleSubmit = (values) => {
    const { updateAlarmMode, viewId } = this.props;
    updateAlarmMode(viewId, values.connectedData.mode);
  };

  render() {
    const entryPoints = _getOr({}, 'configuration.entryPoints')(this.props);
    const {
      viewId,
      tab,
      updateViewPanels,
      panels,
      openModal,
      title,
    } = this.props;

    /**
     * get form from the state
     */
    const { GroundAlarmEditorForm } = this.state;

    return (
      <ErrorBoundary>
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
              <GroundAlarmEditorForm
                form={`entrypoint-connectedData-form-${viewId}`}
                onSubmit={values => this.handleSubmit({ connectedData: values })}
                initialValues={_.getOr({}, [0, 'connectedData'], entryPoints)}
              />
            </div>}
            {
              tab === 1 &&
              <GroundAlarmTabContainer
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
