import _get from 'lodash/get';
import React, { PropTypes, Component } from 'react';
// import { reduxForm /* FieldArray*/ } from 'redux-form';

import DynamicEditorForm from './DynamicEditorForm';
import styles from '../../Editor.css';
import Navbar from '../Navbar/Navbar';

export default class DynamicEditor extends Component {
  static propTypes = {
    viewId: PropTypes.string.isRequired,
    configuration: PropTypes.shape({
      entryPoints: PropTypes.array,
    }),
    timelines: PropTypes.array,
    updateEntryPoint: PropTypes.func.isRequired,
    closeEditor: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func,
    pristine: PropTypes.bool,
    reset: PropTypes.func,
    submitting: PropTypes.bool,
    valid: PropTypes.bool

  }

  changeCurrentDisplay = id => this.setState({ currentDisplay: id });

  handleSubmit = (values) => {
    const { configuration, updateEntryPoint, viewId } = this.props;
    const entryPoint = _get(configuration, ['entryPoints', 0]);

    updateEntryPoint(viewId, 0, {
      ...entryPoint,
      ...values
    });
  }

  render() {
    const { entryPoints } = this.props.configuration;
    const { timelines, viewId } = this.props;
    const currentDisplay = 0;

    return (
      <div className={styles.contentWrapper}>
        <Navbar
          currentDisplay={currentDisplay}
          changeCurrentDisplay={this.changeCurrentDisplay}
          items={['Connected Data']}
          closeEditor={this.props.closeEditor}
        />
        <div className={styles.content}>
          <DynamicEditorForm
            timelines={timelines}
            form={`entrypoint-connectedData-form-${viewId}`}
            onSubmit={values => this.handleSubmit({ connectedData: values })}
            initialValues={entryPoints.length ? entryPoints[0].connectedData : {}}
          />
        </div>
      </div>
    );
  }
}

//
// export default reduxForm({
//   enableReinitialize: true
// })(DynamicEditor);
