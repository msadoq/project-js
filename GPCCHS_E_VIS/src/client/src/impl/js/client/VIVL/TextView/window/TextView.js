import React, { Component, PropTypes } from 'react';
import Mustache from 'mustache';

export default class TextView extends Component {
  state = { template: '' };

  static propTypes = {
    viewId: PropTypes.string.isRequired,
    data: PropTypes.any,
    interval: PropTypes.object.isRequired,
    configuration: PropTypes.object.isRequired,
    size: PropTypes.object.isRequired,
    // entryPoints: PropTypes.array.isRequired,
    // links: PropTypes.array,
    // defaultRatio: PropTypes.object,
  };

  componentDidMount(){
    // recreate the html string from an array
    this.setState({ template: this.props.configuration.content.join('') });
  }

  getMarkup = () => Mustache.render(
    this.state.template,
    this.props.configuration.textViewEntryPoints
  )

  render() {
    const innerHTML = this.getMarkup();
    return (
      <div>
        ok text view ({this.props.viewId})
        size: {this.props.size.width}x{this.props.size.height}
        <br />
        {JSON.stringify(this.props.interval)}
        <br />
        {JSON.stringify(this.props.data)}
        {this.props.viewId}
        <div dangerouslySetInnerHTML={{ __html: innerHTML }}></div>
      </div>
    );
  }
}
