import React, { Component, PropTypes } from 'react';

export default class ValueSpan extends Component {
  static propTypes = {
    value: PropTypes.number,
    className: PropTypes.string,
    epName: PropTypes.string,
    viewId: PropTypes.string,
    emitter: PropTypes.object,
  }

  componentDidMount() {
    const {
      viewId,
      epName,
      emitter,
    } = this.props;

    emitter.on(`${viewId}-update`, (data) => {
      if (this.el && data[epName]) {
        this.el.innerHTML = data[epName].value;
        this.el.className = data[epName].className;
      }
    });
  }

  render() {
    return (
      <span
        className={this.props.className}
        ref={(el) => { this.el = el; }}
      >
        {this.props.value}
      </span>
    );
  }
}
