// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #3622 : 09/03/2017 : Moving DynamicView PlotView and TextView in dataManager.
// VERSION : 1.1.2 : DM : #3622 : 10/03/2017 : Optimize TextView values rendering .
// VERSION : 1.1.2 : DM : #3622 : 14/03/2017 : Move general variables at top level of a view
// VERSION : 1.1.2 : DM : #3622 : 22/03/2017 : Update viewData organization for last structure + cleaning
// VERSION : 1.1.2 : DM : #5822 : 22/03/2017 : add context menu on text view
// VERSION : 1.1.2 : DM : #5828 : 23/03/2017 : Fix TextView and hidden values when editor is open
// VERSION : 1.1.2 : DM : #5828 : 23/03/2017 : Cleanup React components tree and props
// VERSION : 1.1.2 : DM : #5822 : 23/03/2017 : merge dev in working branch
// VERSION : 1.1.2 : DM : #5828 : 24/03/2017 : Cleanup React components tree and props
// VERSION : 1.1.2 : DM : #5822 : 24/03/2017 : inspector view: separate general data from specific TM data
// VERSION : 1.1.2 : DM : #5822 : 27/03/2017 : fix openInspector and InspectorContainer imports
// VERSION : 1.1.2 : DM : #5822 : 27/03/2017 : merge dev in working branch
// VERSION : 1.1.2 : DM : #5828 : 30/03/2017 : Fix open editor when entrypoint is dropped
// VERSION : 1.1.2 : DM : #5828 : 03/04/2017 : Add some eslint relaxation rules
// VERSION : 1.1.2 : DM : #5822 : 03/04/2017 : merge dev in working branch
// VERSION : 1.1.2 : DM : #5828 : 06/04/2017 : Fix 0 display in text view
// VERSION : 1.1.2 : DM : #5828 : 18/04/2017 : mark parameter as checked in context menu when opened in inspector
// VERSION : 1.1.2 : DM : #5828 : 18/04/2017 : open parameter in editor via context menu
// VERSION : 1.1.2 : DM : #5828 : 18/04/2017 : add context menu on views
// VERSION : 1.1.2 : DM : #5828 : 03/05/2017 : Fix editor search on open
// VERSION : 1.1.2 : DM : #5822 : 03/05/2017 : Inspector : display dynamic data
// VERSION : 1.1.2 : DM : #6785 : 31/05/2017 : Add possibility to show links in views
// VERSION : 1.1.2 : DM : #6785 : 12/06/2017 : activate links in views .
// VERSION : 1.1.2 : DM : #5828 : 14/06/2017 : Move common/log and common/parameters in client/
// VERSION : 1.1.2 : DM : #7111 : 03/07/2017 : Add config parameter VISU_WINDOW_MAX_DURATION to limit visuWindow per view
// VERSION : 1.1.2 : DM : #6829 : 06/07/2017 : RV : perform dom updates only if necessaries, keeping attributes color, title and value (innerHTML) in memory.
// VERSION : 1.1.2 : DM : #7281 : 19/07/2017 : First benchmark draft for the TextView, split between TextView - TextViewWrapper .
// VERSION : 1.1.2 : DM : #7281 : 19/07/2017 : perfOutput logging in TextView happens after requestAnimationFrame.
// VERSION : 1.1.2 : DM : #7281 : 19/07/2017 : REVERT perfOutput logging in TextView happens after requestAnimationFrame.
// VERSION : 1.1.2 : DM : #6785 : 21/07/2017 : add links on textview if specify in html editor
// VERSION : 1.1.2 : DM : #6785 : 21/07/2017 : add links on mimicView if specify in svg editor
// VERSION : 1.1.2 : DM : #6700 : 03/08/2017 : Merge branch 'dev' into dbrugne-data
// VERSION : 1.1.2 : DM : #6816 : 09/08/2017 : Textview is now in dark
// VERSION : 1.1.2 : DM : #6816 : 28/08/2017 : Added eslint warning error justification in TextView.
// VERSION : 1.1.2 : FA : #7834 : 14/09/2017 : Fixed right click bug on TextView, confusion between TextView and TextViewWrapper
// VERSION : 1.1.2 : FA : #7753 : 19/09/2017 : Resolved millenary problem with text and values interpolation in TextView code editor.
// END-HISTORY
// ====================================================================

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
