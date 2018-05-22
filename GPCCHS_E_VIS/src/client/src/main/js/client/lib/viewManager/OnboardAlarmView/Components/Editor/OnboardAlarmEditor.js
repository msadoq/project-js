import _get from 'lodash/get';
import React, { PropTypes, Component } from 'react';
import Navbar from 'viewManager/commonEditor/Navbar/Navbar';
import { Misc } from 'viewManager/commonEditor/Misc';
import ReloadAndSaveViewButtonsContainer from 'viewManager/commonEditor/ReloadAndSaveViewButtonsContainer';
import styles from '../../../commonEditor/Editor.css';
import OnboardAlarmTab from './OnboardAlarmTab';
import WithForm from '../../../common/Hoc/WithForm';
import AlarmViewEntryPoints from '../../../commonEditor/EntryPoint/AlarmViewEntryPoints';

const navItems = ['Connected Data', 'View', 'Misc'];

export default class OnboardAlarmEditor extends Component {
  static propTypes = {
    viewId: PropTypes.string.isRequired,
    tab: PropTypes.number,
    titleStyle: PropTypes.shape({
      align: PropTypes.string,
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
      entryPoints: PropTypes.array,
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
    OnBoardAlarmEditorForm: WithForm(AlarmViewEntryPoints),
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.viewId !== this.props.viewId) {
      this.setState({
        OnBoardAlarmEditorForm: WithForm(AlarmViewEntryPoints),
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
    const { entryPoints } = this.props.configuration;
    const {
      viewId,
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
    const { OnBoardAlarmEditorForm } = this.state;

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
            <OnBoardAlarmEditorForm
              form={`entrypoint-connectedData-form-${viewId}`}
              onSubmit={values => this.handleSubmit({ connectedData: values })}
              initialValues={initialValues}
            />
          </div>}
          {tab === 1 && <OnboardAlarmTab />}
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
