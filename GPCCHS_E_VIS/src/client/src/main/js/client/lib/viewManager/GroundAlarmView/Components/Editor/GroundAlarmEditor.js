import _get from 'lodash/get';
import React, { PropTypes, Component } from 'react';
import Navbar from 'viewManager/commonEditor/Navbar/Navbar';
import { Misc } from 'viewManager/commonEditor/Misc';
import ReloadAndSaveViewButtonsContainer from 'viewManager/commonEditor/ReloadAndSaveViewButtonsContainer';
import GroundAlarmEditorForm from './GroundAlarmEditorForm';
import styles from '../../../commonEditor/Editor.css';
import GroundAlarmTab from './GroundAlarmTab';

const navItems = ['Connected Data', 'View', 'Misc'];

export default class GroundAlarmEditor extends Component {
  static propTypes = {
    viewId: PropTypes.string.isRequired,
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
      entryPoints: PropTypes.array,
    }).isRequired,
    timelines: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    domains: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    updateEntryPoint: PropTypes.func.isRequired,
    updateViewTab: PropTypes.func.isRequired,
    updateViewPanels: PropTypes.func.isRequired,
    openModal: PropTypes.func.isRequired,
    panels: PropTypes.shape({}).isRequired,
  }

  static defaultProps = {
    titleStyle: {},
    tab: null,
    title: '',
  }

  changeCurrentDisplay = (id) => {
    const { updateViewTab, viewId } = this.props;
    updateViewTab(viewId, id);
  }

  handleSubmit = (values) => {
    const { configuration, updateEntryPoint, viewId } = this.props;
    const entryPoint = _get(configuration, ['entryPoints', 0]);
    updateEntryPoint(viewId, entryPoint.id, {
      ...entryPoint,
      ...values,
    });
  }

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
    const initialValues = entryPoints.length
      ? {
        ...entryPoints[0].connectedData,
        timeline: '*', // reset timeline & domain in GA because the field disappears
        domain: '*',
      }
      : nullObject;

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
              initialValues={initialValues}
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
