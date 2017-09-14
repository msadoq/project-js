import React, { PureComponent, PropTypes } from 'react';
import {
  Parser,
  ProcessNodeDefinitions,
} from 'html-to-react';
import { html as beautifyHtml } from 'js-beautify';

const isValueNode = /{{\s*([^}]+)\s*}}/g;

const getTextStyle = color => ({
  // textShadow: `
  //   0 0 5px rgba(255, 255, 255, 0.1),
  //   0 0 10px rgba(255, 255, 255, 0.1),
  //   0 0 20px ${color},
  //   0 0 30px ${color},
  //   0 0 40px ${color},
  //   0 0 55px ${color},
  //   0 0 75px ${color}
  // `,
  color,
});

const memoizedGetTextStyles = (() => {
  const style = [];
  return (color) => {
    if (!style[color]) {
      style[color] = getTextStyle(color);
    }
    return style[color];
  };
})();

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
    this.updateSpanValues(this.props.data);
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
      this.updateSpanValues(nextProps.data);
    }
    return shouldRender;
  }

  componentDidUpdate() {
    this.updateSpanValues(this.props.data);
  }

  getContentComponent() {
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
          const reactElement = React.createElement(node.name, tagProps, children);
          return reactElement;
        },
      },
      {
        shouldProcessNode: (node => node.data && node.data.match(isValueNode)),
        processNode: (node, children, index) => {
          const matches = node.data.match(isValueNode);
          const nodes = [];
          for (let i = 0, len = matches.length; i < len; i += 1) {
            const match = matches[i];
            const epName = match.substring(2, match.length - 2);
            const rand = Math.round(Math.random() * 100000);
            const id = `${this.props.viewId}_tv_${epName}_${rand}`;

            this.spanValues[id] = { ep: epName };

            nodes.push(
              <span className="ep" key={`${epName}-${index}`} id={id} />
            );
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

  spanValues = {};

  updateSpanValues(data) {
    if (!data.values) {
      return;
    }
    const { perfOutput, copySpanValues } = this.props;
    if (perfOutput) {
      // eslint-disable-next-line no-console, "DV6 TBC_CNES Perf logging"
      console.time();
    }
    requestAnimationFrame(() => {
      const spanIds = Object.keys(this.spanValues);
      for (let i = 0; i < spanIds.length; i += 1) {
        const id = spanIds[i];
        const sv = this.spanValues[id];
        const ep = this.props.entryPoints[sv.ep];
        if (ep) {
          const val = data.values[sv.ep] || {};
          if (!sv.el) {
            sv.el = document.getElementById(id);
          }
          let v = val.value;
          if (v === undefined) {
            v = '';
          }
          if (v !== sv.val) {
            sv.val = v;
            sv.el.innerHTML = ep.error ? 'Invalid entry point' : v;
          }
          if (ep.error && ep.error !== sv.title) {
            sv.title = ep.error;
            sv.el.setAttribute('title', ep.error);
          }

          const s = memoizedGetTextStyles(ep.error ? '#FF0000' : val.color || '#41a62a');
          if (s.color !== sv.color) {
            sv.color = s.color;
            sv.el.style.color = s.color;
            sv.el.style.textShadow = s.textShadow;
          }
        }
      }
      if (perfOutput) {
        // eslint-disable-next-line no-console, "DV6 TBC_CNES Perf logging"
        console.log(
          'Looped on',
          spanIds.length,
          'eps'
        );
        // eslint-disable-next-line no-console, "DV6 TBC_CNES Perf logging"
        console.timeEnd();
      }
    });
    if (copySpanValues) {
      copySpanValues(this.spanValues);
    }
  }

  handleClicked = (e) => {
    if (e.target.getAttribute('data-isis-link')) {
      this.props.openLink(e.target.getAttribute('data-isis-link'));
    }
  }
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
