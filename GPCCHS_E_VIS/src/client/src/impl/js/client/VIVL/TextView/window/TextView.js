import React, { Component, PropTypes } from 'react';
import Mustache from 'mustache';

export default class TextView extends Component {
  static propTypes = {
    // viewId: PropTypes.string.isRequired,
    data: PropTypes.shape({
      values: PropTypes.object,
    }),
    configuration: PropTypes.object.isRequired,
    // entryPoints: PropTypes.array.isRequired,
    // links: PropTypes.array,
    // defaultRatio: PropTypes.object,
  };
  static defaultProps = {
    data: {
      values: {},
    },
  };

  constructor(props, context) {
    super(props, context);

    // recreate the html string from an array
    this.state = {
      template: props.configuration.content.join(''),
    };
  }

  getMarkup = () => Mustache.render(
    this.state.template,
    this.props.data.values
  );

  render() {
    const innerHTML = this.getMarkup();
    return (
      <div>
        {/* eslint-disable-next-line react/no-danger */}
        <div dangerouslySetInnerHTML={{ __html: innerHTML }} />
      </div>
    );
  }
}
