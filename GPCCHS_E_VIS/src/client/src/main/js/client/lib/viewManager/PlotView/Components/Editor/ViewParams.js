import React, { PropTypes } from 'react';
import ViewParamsForm from './ViewParamsForm';

export default class ViewParams extends React.Component {
  static propTypes = {
    viewId: PropTypes.string.isRequired,
    toggleLegend: PropTypes.func.isRequired,
    updateLegend: PropTypes.func.isRequired,
    updateTitle: PropTypes.func.isRequired,
    updateTitleStyle: PropTypes.func.isRequired,
    updateBgColor: PropTypes.func.isRequired,
    updateDomainName: PropTypes.func.isRequired,
    updateSessionName: PropTypes.func.isRequired,
    showLegend: PropTypes.boolean,
    legend: PropTypes.shape(),
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
    links: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
    })).isRequired,
    defaultRatio: PropTypes.shape({
      length: PropTypes.number.isRequired,
      width: PropTypes.number.isRequired,
    }).isRequired,
    domains: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    sessions: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    domainName: PropTypes.string,
    sessionName: PropTypes.string,
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
    showLegend: false,
    legend: { location: 'bottom' },
    domainName: '',
    sessionName: '',
  }

  handleSubmit = (values) => {
    const {
      updateTitle, updateTitleStyle,
      updateBgColor, viewId,
      updateDomainName, updateSessionName,
      showLegend, legend,
      toggleLegend, updateLegend,
    } = this.props;

    if (showLegend !== values.showLegend) {
      toggleLegend(viewId, values.showLegend);
    }
    if (legend.location !== values.legend.location) {
      updateLegend(viewId, values.legend);
    }
    if (this.props.backgroundColor !== values.backgroundColor) {
      updateBgColor(viewId, values.backgroundColor);
    }
    if (this.props.title !== values.title) {
      updateTitle(viewId, values.title);
    }
    if (this.props.titleStyle !== values.titleStyle) {
      updateTitleStyle(viewId, values.titleStyle);
    }
    if (this.props.domainName !== values.domainName) {
      updateDomainName(viewId, values.domainName);
    }
    if (this.props.sessionName !== values.sessionName) {
      updateSessionName(viewId, values.sessionName);
    }
  }

  render() {
    const {
      backgroundColor,
      title,
      titleStyle,
      links,
      defaultRatio,
      viewId,
      domains,
      sessions,
      domainName,
      sessionName,
      showLegend,
      legend,
    } = this.props;
    const initVals = {
      backgroundColor,
      title,
      titleStyle,
      links,
      defaultRatio,
      domainName,
      sessionName,
      showLegend,
      legend,
    };
    // console.log(legend);
    // console.log(showLegend);
    return (
      <ViewParamsForm
        initialValues={initVals}
        onSubmit={this.handleSubmit}
        form={`view-title-form-${viewId}`}
        domains={domains}
        sessions={sessions}
      />
    );
  }
}
