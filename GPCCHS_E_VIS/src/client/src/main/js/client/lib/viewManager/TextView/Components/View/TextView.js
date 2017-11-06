import React, { PropTypes, PureComponent } from 'react';
import { Parser, ProcessNodeDefinitions } from 'html-to-react';
import { html as beautifyHtml } from 'js-beautify';
import updateSpanValues from './TextViewFunctions';

const isValueNode = /{{\s*([^}]+)\s*}}/g;

const getEpSpan = (target) => {
  const spans = target.querySelectorAll('.ep');
  if (spans.length === 1) {
    return spans[0];
  }
  if (spans.length > 1) {
    return null;
  }
  const parent = target.parentNode;
  if (!parent) {
    return null;
  }
  return getEpSpan(parent);
};

export default class TextView extends PureComponent {
  static propTypes = {
    viewId: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    entryPoints: PropTypes.objectOf(PropTypes.object),
    data: PropTypes.shape({
      values: PropTypes.object,
    }),
    perfOutput: PropTypes.bool,
    openLink: PropTypes.func.isRequired,
    copySpanValues: PropTypes.func,
  };
  static defaultProps = {
    data: {
      values: {},
    },
    entryPoints: {},
    inspectorEpId: null,
    links: [],
    showLinks: false,
    perfOutput: false,
    copySpanValues: null,
  };

  componentWillMount() {
    this.template = { html: beautifyHtml(this.props.content, { indent_size: 2 }) };
    this.content = this.getContentComponent();
  }

  componentDidMount() {
    // updateSpanValues(this.props.data);
    updateSpanValues(this.props.data,
      this.spanValues,
      this.props.entryPoints,
      this.props.perfOutput);
    if (this.props.copySpanValues) {
      this.props.copySpanValues(this.spanValues);
    }
  }

  shouldComponentUpdate(nextProps) {
    let shouldRender = false;
    if (
      nextProps.content !== this.props.content ||
      nextProps.entryPoints !== this.props.entryPoints
    ) {
      shouldRender = true;
      this.template = { html: beautifyHtml(nextProps.content, { indent_size: 2 }) };
      this.content = this.getContentComponent();
    }
    if (!shouldRender) {
      // updateSpanValues(nextProps.data);
      updateSpanValues(nextProps.data,
        this.spanValues,
        this.props.entryPoints,
        this.props.perfOutput);
      if (this.props.copySpanValues) {
        this.props.copySpanValues(this.spanValues);
      }
    }
    return shouldRender;
  }

  componentDidUpdate() {
    // updateSpanValues(this.props.data);
    updateSpanValues(this.props.data,
      this.spanValues,
      this.props.entryPoints,
      this.props.perfOutput);
    if (this.props.copySpanValues) {
      this.props.copySpanValues(this.spanValues);
    }
  }

  getContentComponent() {
    this.spanValues = {};
    const processingInstructions = [
      {
        shouldProcessNode: (node => node.attribs && node.attribs.isis_link),
        processNode: (node, children) => {
          const tagProps = {};
          Object.keys(node.attribs).forEach((key) => {
            if (key === 'isis_link') {
              tagProps['data-isis-link'] = node.attribs[key];
            } else if (key === 'class') {
              tagProps.className = node.attribs[key];
            } else {
              tagProps[key] = node.attribs[key];
            }
          });
          tagProps.style = { cursor: 'pointer' };
          tagProps.title = `open ${node.attribs.isis_link}`;
          return React.createElement(node.name, tagProps, children);
        },
      },
      {
        shouldProcessNode: (node => node.data && node.data.match(isValueNode)),
        processNode: (node, children, index) => {
          const matches = node.data.match(isValueNode);
          const nodes = [];

          // innerHtml represents the part of node.data that needs to be processed
          let innerHtml = node.data;

          for (let i = 0, len = matches.length; i < len; i += 1) {
            const match = matches[i];
            const epName = match.substring(2, match.length - 2);
            const rand = Math.round(Math.random() * 100000);
            const id = `${this.props.viewId}_tv_${epName}_${rand}`;

            let textString = '';
            if (node.data.length !== match.length) {
              const indexOf = innerHtml.indexOf(match);

              // Is there text before the current match ?
              if (indexOf !== 0) {
                textString = innerHtml.substring(0, indexOf);
                nodes.push(<span key={`${epName}-${index}-text-${i}`}>{textString}</span>);
                innerHtml = innerHtml.substring(indexOf);
              }
            }

            this.spanValues[id] = { ep: epName };
            nodes.push(
              <span className="ep" key={`${epName}-${index}-${i}`} id={id} />
            );
            innerHtml = innerHtml.substring(match.length);

            // Is there text after the last match ?
            if (i === matches.length - 1 && innerHtml.length) {
              nodes.push(<span key={`${epName}-${index}-text-${i}-end`}>{innerHtml}</span>);
            }
          }
          return nodes;
        },
      },
      {
        shouldProcessNode: () => true,
        processNode: this.processNodeDefinitions.processDefaultNode,
      },
    ];

    const comp = this.htmlToReactParser.parseWithInstructions(
      `<div>${this.template.html}</div>`,
      () => true,
      processingInstructions
    );
    return () => comp;
  }
  handleClicked(e) {
    if (e.target.getAttribute('data-isis-link')) {
      this.props.openLink(e.target.getAttribute('data-isis-link'));
    }
  }
  spanValues = {};
  htmlToReactParser = new Parser();
  processNodeDefinitions = new ProcessNodeDefinitions(React);
  render() {
    return (
      // eslint-disable-next-line jsx-a11y/no-static-element-interactions, "DV6 TBC_CNES Links handler"
      <div onClick={e => this.handleClicked(e)}>
        <this.content />
      </div>
    );
  }
}
