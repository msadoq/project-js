import _get from 'lodash/get';
import React, { PropTypes, Component } from 'react';
// import { reduxForm /* FieldArray*/ } from 'redux-form';

import DynamicEditorForm from './DynamicEditorForm';
import styles from '../../Editor.css';
import Navbar from '../Navbar/Navbar';
import DynamicTab from './DynamicTab';

export default class DynamicEditor extends Component {
  static propTypes = {
    viewId: PropTypes.string.isRequired,
    configuration: PropTypes.shape({
      entryPoints: PropTypes.array,
    }),
    title: PropTypes.string,
    titleStyle: PropTypes.object,
    timelines: PropTypes.array,
    updateEntryPoint: PropTypes.func.isRequired,
    closeEditor: PropTypes.func.isRequired,
    updateTitle: PropTypes.func,
    updateTitleStyle: PropTypes.func,
  }
  state = { currentDisplay: 0 };

  changeCurrentDisplay = id => this.setState({ currentDisplay: id });

  handleTextTitle = (newVal) => {
    const { updateTitle, viewId } = this.props;
    updateTitle(viewId, newVal);
  }

  handleTextTitleStyle = (label, newVal) => {
    const { configuration, updateTitleStyle, viewId } = this.props;
    updateTitleStyle(viewId, {
      ...configuration.titleStyle,
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
    const { timelines, viewId, title, titleStyle } = this.props;
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
        {currentDisplay === 1 && <DynamicTab
          title={title}
          handleTextTitle={this.handleTextTitle}
          handleTextTitleStyle={this.handleTextTitleStyle}
          titleStyle={titleStyle}
        />}
      </div>
    );
  }
}

//
// export default reduxForm({
//   enableReinitialize: true
// })(DynamicEditor);
