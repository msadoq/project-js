import React, { PureComponent, PropTypes } from 'react';
import { Row, Col } from 'react-bootstrap';
import _ from 'lodash/fp';
import _get from 'lodash/get';
import _each from 'lodash/each';
import getLogger from '../../../../common/logManager';
import { get } from '../../../../common/configurationManager';
import LinksContainer from '../../../../windowProcess/View/LinksContainer';
import TextView from './TextView';
import DroppableContainer from '../../../../windowProcess/common/DroppableContainer';
import handleContextMenu from '../../../../windowProcess/common/handleContextMenu';
import styles from './TextView.css';

const logger = getLogger('view:text');

const getComObject = _.propOr('UNKNOWN_COM_OBJECT', 0);

// parse clipboard data to create partial entry point
function parseDragData(data) {
  return {
    name: data.item,
    connectedData: {
      formula: `${data.catalogName}.${data.item}<${getComObject(data.comObjects)}>.${get('DEFAULT_FIELD')[getComObject(data.comObjects)]}`,
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
    closeEditor: PropTypes.func.isRequired,
    isViewsEditorOpen: PropTypes.bool.isRequired,
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
    isMaxVisuDurationExceeded: PropTypes.bool.isRequired,
    openLink: PropTypes.func.isRequired,
  };
  static defaultProps = {
    data: {
      values: {},
    },
    entryPoints: {},
    inspectorEpId: null,
    links: [],
    showLinks: false,
  };

  onContextMenu = (event) => {
    event.stopPropagation();
    const {
      entryPoints,
      openInspector,
      isViewsEditorOpen,
      openEditor,
      closeEditor,
      mainMenu,
      isInspectorOpened,
      inspectorEpId,
    } = this.props;
    const span = getEpSpan(event.target);
    const separator = { type: 'separator' };
    if (span) {
      const epName = _get(this.spanValues, [span.id, 'ep']);
      const editorMenu = [{
        label: `Open ${epName} in Editor`,
        click: () => {
          openEditor(epName);
        },
      }];
      if (isViewsEditorOpen) {
        editorMenu.push({
          label: 'Close Editor',
          click: () => closeEditor(),
        });
      }
      const inspectorLabel = `Open ${epName} in Inspector`;
      if (_get(entryPoints, [epName, 'error'])) {
        const inspectorMenu = {
          label: inspectorLabel,
          enabled: false,
        };
        handleContextMenu([inspectorMenu, ...editorMenu, separator, ...mainMenu]);
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
      handleContextMenu([inspectorMenu, ...editorMenu, separator, ...mainMenu]);
      return;
    }
    const editorMenu = (isViewsEditorOpen) ?
    {
      label: 'Close Editor',
      click: () => closeEditor(),
    } : {
      label: 'Open Editor',
      click: () => {
        openEditor();
      },
    };
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
    handleContextMenu([inspectorMenu, editorMenu, separator, ...mainMenu]);
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
      viewId, links, pageId, showLinks,
      content, openEditor, isMaxVisuDurationExceeded,
      openInspector, closeEditor, data, isViewsEditorOpen,
      mainMenu, isInspectorOpened, inspectorEpId,
      entryPoints,
     } = this.props;
    logger.debug(`render ${viewId}`);
    const style = { padding: '15px' };
    if (isMaxVisuDurationExceeded) {
      const noRenderMsg = 'Visu Window is too long for this type of view';
      logger.debug('no render due to', noRenderMsg);
      return (
        <div className="flex">
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
        className="h100 posRelative"
      >
        <Row>
          <Col xs={12}>
            <TextView
              viewId={viewId}
              content={content}
              openInspector={openInspector}
              openEditor={openEditor}
              closeEditor={closeEditor}
              isViewsEditorOpen={isViewsEditorOpen}
              data={data}
              mainMenu={mainMenu}
              isInspectorOpened={isInspectorOpened}
              inspectorEpId={inspectorEpId}
              entryPoints={entryPoints}
              openLink={this.props.openLink}
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
