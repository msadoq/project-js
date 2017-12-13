import React, { PureComponent, PropTypes } from 'react';
import { Row, Col } from 'react-bootstrap';
import _each from 'lodash/each';
import handleContextMenu from 'windowProcess/common/handleContextMenu';
import getLogger from 'common/logManager';
import LinksContainer from 'windowProcess/View/LinksContainer';
import styles from './MimicView.css';
import MimicView from './MimicView';

const logger = getLogger('view:mimic');

export default class MimicViewWrapper extends PureComponent {

  static propTypes = {
    content: PropTypes.string.isRequired,
    entryPoints: PropTypes.objectOf(PropTypes.object).isRequired,
    data: PropTypes.shape({
      values: PropTypes.object,
    }).isRequired,
    viewId: PropTypes.string.isRequired,
    links: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
    })),
    removeLink: PropTypes.func.isRequired,
    pageId: PropTypes.string.isRequired,
    showLinks: PropTypes.bool,
    updateShowLinks: PropTypes.func.isRequired,
    mainMenu: PropTypes.arrayOf(PropTypes.object).isRequired,
    isInspectorOpened: PropTypes.bool.isRequired,
    inspectorEpId: PropTypes.string,
    openInspector: PropTypes.func.isRequired,
    isMaxVisuDurationExceeded: PropTypes.bool.isRequired,
    openLink: PropTypes.func.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
  };

  static defaultProps = {
    links: [],
    showLinks: false,
    inspectorEpId: null,
  };

  onContextMenu = (event) => {
    event.stopPropagation();
    const {
      entryPoints,
      openInspector,
      mainMenu,
      isInspectorOpened,
      inspectorEpId,
    } = this.props;
    const separator = { type: 'separator' };
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

  toggleShowLinks = (e) => {
    e.preventDefault();
    const { showLinks, updateShowLinks, viewId } = this.props;
    updateShowLinks(viewId, !showLinks);
  }
  removeLink = (e, index) => {
    e.preventDefault();
    const { removeLink, viewId } = this.props;
    removeLink(viewId, index);
  }

  handleClicked = (e) => {
    if (e.target.getAttribute('data-isis-link')) {
      this.props.openLink(e.target.getAttribute('data-isis-link'));
    }
  }

  render() {
    const {
      links,
      viewId,
      pageId,
      showLinks,
      isMaxVisuDurationExceeded,
      content,
      entryPoints,
      data,
    } = this.props;
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
      <div className={`h100 posRelative ${styles.container}`} onContextMenu={this.onContextMenu}>
        <Row className="h100 posRelative">
          <Col xs={12} style={style}>
            <LinksContainer
              show={showLinks}
              toggleShowLinks={this.toggleShowLinks}
              links={links}
              removeLink={this.removeLink}
              pageId={pageId}
              viewId={viewId}
            />
          </Col>
          <Col xs={12} className="h100 posRelative" onClick={e => this.handleClicked(e)}>
            <MimicView
              content={content}
              entryPoints={entryPoints}
              data={data}
              perfOutput={false}
              width={this.props.width}
              height={this.props.height}
            />
          </Col>
        </Row>
      </div>
    );
  }
}
