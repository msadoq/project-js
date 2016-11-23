import React, { PropTypes } from 'react';
import ViewTitleForm from './ViewTitleForm';

export default class ViewTitle extends React.Component {
  static propTypes = {
    viewId: PropTypes.string.isRequired,
    updateTitle: PropTypes.func.isRequired,
    updateTitleStyle: PropTypes.func.isRequired,
    title: PropTypes.string,
    titleStyle: PropTypes.shape({
      font: PropTypes.string,
      size: PropTypes.number,
      bold: PropTypes.boolean,
      italic: PropTypes.boolean,
      underline: PropTypes.boolean,
      strikeOut: PropTypes.boolean,
      align: PropTypes.string,
      color: PropTypes.string
    })
  }

  static defaultProps = {
    title: '',
    titleStyle: {}
  }

  handleSubmit = (values) => {
    const { updateTitle, updateTitleStyle, viewId } = this.props;

    if (this.props.title !== values.title) {
      updateTitle(viewId, values.title);
    }
    if (this.props.titleStyle !== values.titleStyle) {
      updateTitleStyle(viewId, values.titleStyle);
    }
  }

  render() {
    const {
      title,
      titleStyle,
      viewId
    } = this.props;

    return (
      <ViewTitleForm
        initialValues={{
          title,
          titleStyle
        }}
        onSubmit={this.handleSubmit}
        form={`view-title-form-${viewId}`}
      />
    );
  }
}
