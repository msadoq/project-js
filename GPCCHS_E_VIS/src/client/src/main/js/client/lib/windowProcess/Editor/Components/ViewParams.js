import React, { PropTypes } from 'react';
import ViewParamsForm from './ViewParamsForm';

export default class ViewParams extends React.Component {
  static propTypes = {
    viewId: PropTypes.string.isRequired,
    updateTitle: PropTypes.func.isRequired,
    updateTitleStyle: PropTypes.func.isRequired,
    updateBgColor: PropTypes.func.isRequired,
    backgroundColor: PropTypes.string,
    title: PropTypes.string,
    titleStyle: PropTypes.shape({
      font: PropTypes.string,
      size: PropTypes.number,
      bold: PropTypes.bool,
      italic: PropTypes.bool,
      underline: PropTypes.bool,
      strikeOut: PropTypes.bool,
      align: PropTypes.string,
      color: PropTypes.string,
    }),
  }

  static defaultProps = {
    title: '',
    titleStyle: {
      font: 'Arial',
      size: 12,
      bold: false,
      italic: false,
      underline: false,
      strikeOut: false,
      align: 'left',
      color: '#000000',
    },
    backgroundColor: '#000000',
  }

  handleSubmit = (values) => {
    const {
      updateTitle, updateTitleStyle,
      updateBgColor, viewId,
    } = this.props;

    if (this.props.backgroundColor !== values.backgroundColor) {
      updateBgColor(viewId, values.backgroundColor);
    }
    if (this.props.title !== values.title) {
      updateTitle(viewId, values.title);
    }
    if (this.props.titleStyle !== values.titleStyle) {
      updateTitleStyle(viewId, values.titleStyle);
    }
  }

  render() {
    const {
      backgroundColor,
      title,
      titleStyle,
      viewId,
    } = this.props;
    const initVals = {
      backgroundColor,
      title,
      titleStyle,
    };
    return (
      <ViewParamsForm
        initialValues={initVals}
        onSubmit={this.handleSubmit}
        form={`view-title-form-${viewId}`}
      />
    );
  }
}
