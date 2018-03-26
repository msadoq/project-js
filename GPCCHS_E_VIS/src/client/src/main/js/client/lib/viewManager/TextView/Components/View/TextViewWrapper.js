// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #7281 : 19/07/2017 : First benchmark draft for the TextView, split between TextView - TextViewWrapper .
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 20/07/2017 : Reimplement openLink middleware . .
// VERSION : 1.1.2 : DM : #6785 : 21/07/2017 : add links on textview if specify in html editor
// VERSION : 1.1.2 : DM : #6700 : 03/08/2017 : Merge branch 'dev' into dbrugne-data
// VERSION : 1.1.2 : DM : #6127 : 04/09/2017 : View component now do not automatically set overflow to auto
// VERSION : 1.1.2 : FA : #7834 : 14/09/2017 : Fixed right click bug on TextView, confusion between TextView and TextViewWrapper
// END-HISTORY
// ====================================================================

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';
import _ from 'lodash/fp';
import _get from 'lodash/get';
import _each from 'lodash/each';
import classnames from 'classnames';
import getLogger from 'common/logManager';
import LinksContainer from 'windowProcess/View/LinksContainer';
import handleContextMenu from 'windowProcess/common/handleContextMenu';
import DroppableContainer from 'windowProcess/common/DroppableContainer';
import TextView from './TextView';
import styles from './TextView.css';
import { buildFormulaForAutocomplete } from '../../../common';

const logger = getLogger('view:text');

const getComObject = _.propOr('UNKNOWN_COM_OBJECT', 0);

// parse clipboard data to create partial entry point
function parseDragData(data) {
  const formula =
    buildFormulaForAutocomplete(
      data.catalogName,
      data.item,
      getComObject(data.comObjects),
      data.comObjectFields
    );

  return {
    name: data.item,
    connectedData: {
      formula,
    },
  };
}

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

export default class TextViewWrapper extends PureComponent {
  static propTypes = {
    viewId: PropTypes.string.isRequired,
    addEntryPoint: PropTypes.func.isRequired,
    content: PropTypes.string.isRequired,
    updateContent: PropTypes.func.isRequired,
    entryPoints: PropTypes.objectOf(PropTypes.object),
    openInspector: PropTypes.func.isRequired,
    openEditor: PropTypes.func.isRequired,
    data: PropTypes.shape({
      values: PropTypes.object,
    }),
    mainMenu: PropTypes.arrayOf(PropTypes.object).isRequired,
    isInspectorOpened: PropTypes.bool.isRequired,
    inspectorEpId: PropTypes.string,
    links: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
    })),
    removeLink: PropTypes.func.isRequired,
    pageId: PropTypes.string.isRequired,
    showLinks: PropTypes.bool,
    updateShowLinks: PropTypes.func.isRequired,
    updateSearchCount: PropTypes.func.isRequired,
    isMaxVisuDurationExceeded: PropTypes.bool.isRequired,
    openLink: PropTypes.func.isRequired,
    searching: PropTypes.string,
  };

  static defaultProps = {
    data: {
      values: {},
    },
    entryPoints: {},
    inspectorEpId: null,
    links: [],
    showLinks: false,
    searching: null,
  };

  state = { content: this.props.content };

  componentWillReceiveProps(nextProps) {
    const { content, searching } = nextProps;
    const newContent = this.getContentWithSearchingHighlight(content, searching);
    this.setState({ content: newContent });
  }

  onContextMenu = (event) => {
    event.stopPropagation();
    const {
      entryPoints,
      openInspector,
      mainMenu,
      isInspectorOpened,
      inspectorEpId,
    } = this.props;
    if (!this.spanValues) {
      return;
    }
    const span = getEpSpan(event.target);
    const separator = { type: 'separator' };
    if (span) {
      const epName = _get(this.spanValues, [span.id, 'ep']);
      const inspectorLabel = `Open ${epName} in Inspector`;
      if (_get(entryPoints, [epName, 'error'])) {
        const inspectorMenu = {
          label: inspectorLabel,
          enabled: false,
        };
        handleContextMenu([inspectorMenu, separator, ...mainMenu]);
        return;
      }
      const { id, dataId, field } = entryPoints[epName];
      const opened = isInspectorOpened && (inspectorEpId === id);
      const inspectorMenu = {
        label: inspectorLabel,
        type: 'checkbox',
        click: () => openInspector({
          epId: id,
          dataId,
          epName,
          field,
        }),
        checked: opened,
      };
      handleContextMenu([inspectorMenu, separator, ...mainMenu]);
      return;
    }
    const inspectorMenu = {
      label: 'Open in Inspector',
      submenu: [],
    };
    _each(entryPoints, (ep, epName) => {
      const label = `${epName}`;
      if (ep.error) {
        inspectorMenu.submenu.push({ label, enabled: false });
        return;
      }
      const { id, dataId, field } = ep;
      const opened = isInspectorOpened && (inspectorEpId === id);
      inspectorMenu.submenu.push({
        label,
        type: 'checkbox',
        click: () => openInspector({
          epId: id,
          dataId,
          epName,
          field,
        }),
        checked: opened,
      });
    });
    handleContextMenu([inspectorMenu, separator, ...mainMenu]);
  };

  onDrop = (e) => {
    const data = e.dataTransfer.getData('text/plain');
    const content = JSON.parse(data);

    if (!_get(content, 'catalogName')) {
      return;
    }

    this.props.addEntryPoint(
      parseDragData(content)
    );
    this.props.openEditor();

    e.stopPropagation();
  }

  setSpanValues = (spanValues) => {
    this.spanValues = spanValues;
  }

  getContentWithSearchingHighlight = (content, searching) => {
    const { updateSearchCount } = this.props;
    const regex = new RegExp(`(\\W)(\\w*)(${searching})(\\w*)(\\W)`, 'g');
    let count = 0;
    const newContent = content.replace(regex, (match, group1, group2, group3, group4, group5) => {
      if (group2 !== '{' && group5 !== '}') {
        count += 1;
        return `${group1}${group2}<span className='${styles.highlighted}'>${group3}</span>${group4}${group5}`;
      }
      return match;
    });
    updateSearchCount(count);
    return newContent;
  }

  handleSubmit = (values) => {
    const { updateContent } = this.props;
    updateContent(values.html);
  }

  toggleShowLinks = (e) => {
    e.preventDefault();
    const { showLinks, updateShowLinks } = this.props;
    updateShowLinks(!showLinks);
  }

  removeLink = (e, index) => {
    e.preventDefault();
    const { removeLink } = this.props;
    removeLink(index);
  }

  render() {
    const {
      viewId,
      links,
      pageId,
      showLinks,
      isMaxVisuDurationExceeded,
      data,
      entryPoints,
     } = this.props;
    logger.debug(`render ${viewId}`);
    const style = { padding: '15px' };
    if (isMaxVisuDurationExceeded) {
      const noRenderMsg = 'Visu Window is too long for this type of view';
      logger.debug('no render due to', noRenderMsg);
      return (
        <div className={`flex ${styles.container}`}>
          <div className={styles.renderErrorText}>
            Unable to render view <br />
            {noRenderMsg}
          </div>
        </div>
      );
    }

    return (
      <DroppableContainer
        onDrop={this.onDrop}
        onContextMenu={this.onContextMenu}
        className={classnames('h100', 'posRelative', styles.container)}
      >
        <Row>
          <Col xs={12}>
            <TextView
              viewId={viewId}
              content={this.state.content}
              data={data}
              entryPoints={entryPoints}
              openLink={this.props.openLink}
              copySpanValues={this.setSpanValues}
              className={styles.textView}
            />
          </Col>
          <Col xs={12} style={style}>
            <LinksContainer
              show={showLinks}
              toggleShowLinks={this.toggleShowLinks}
              links={links}
              removeLink={this.removeLink}
              viewId={viewId}
              pageId={pageId}
            />
          </Col>
        </Row>
      </DroppableContainer>
    );
  }
}
