import _get from 'lodash/get';
import React, { PropTypes, Component } from 'react';
import DynamicEditorForm from './DynamicEditorForm';
import styles from '../../../commonEditor/Editor.css';
import Navbar from '../../../commonEditor/Navbar/Navbar';
import DynamicTab from './DynamicTab';

export default class DynamicEditor extends Component {
  static propTypes = {
    viewId: PropTypes.string.isRequired,
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
    }).isRequired,
    configuration: PropTypes.shape({
      entryPoints: PropTypes.array,
    }).isRequired,
    timelines: PropTypes.arrayOf(PropTypes.object).isRequired,
    updateEntryPoint: PropTypes.func.isRequired,
    closeEditor: PropTypes.func.isRequired,
    updateTitle: PropTypes.func.isRequired,
    updateTitleStyle: PropTypes.func.isRequired,
  }
  state = { currentDisplay: 0 };

  changeCurrentDisplay = id => this.setState({ currentDisplay: id });

  handleTextTitle = (newVal) => {
    const { updateTitle, viewId } = this.props;
    updateTitle(viewId, newVal);
  }

  handleTextTitleStyle = (label, newVal) => {
    const { titleStyle, updateTitleStyle, viewId } = this.props;
    updateTitleStyle(viewId, {
      ...titleStyle,
      [label]: newVal,
    });
  }

  handleSubmit = (values) => {
    const { configuration, updateEntryPoint, viewId } = this.props;
    const entryPoint = _get(configuration, ['entryPoints', 0]);

    updateEntryPoint(viewId, 0, {
      ...entryPoint,
      ...values,
    });
  }

  render() {
    const { entryPoints } = this.props.configuration;
    const { timelines, viewId } = this.props;
    const { currentDisplay } = this.state;
    const navItems = ['Connected Data', 'View'];
    const nullObject = {};
    return (
      <div className={styles.contentWrapper}>
        <Navbar
          currentDisplay={currentDisplay}
          changeCurrentDisplay={this.changeCurrentDisplay}
          items={navItems}
          closeEditor={this.props.closeEditor}
        />
        {currentDisplay === 0 && <div className={styles.content}>
          <DynamicEditorForm
            timelines={timelines}
            form={`entrypoint-connectedData-form-${viewId}`}
            onSubmit={values => this.handleSubmit({ connectedData: values })}
            initialValues={entryPoints.length ? entryPoints[0].connectedData : nullObject}
          />
        </div>}
        {currentDisplay === 1 && <DynamicTab />}
      </div>
    );
  }
}
