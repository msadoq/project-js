import React, { PureComponent, PropTypes } from 'react';
import { basename } from 'path';
import { Nav, NavItem, Button, Glyphicon, OverlayTrigger, Table, Popover } from 'react-bootstrap';
import getLogger from 'common/log';
import styles from './Tabs.css';

const logger = getLogger('Tabs');

function popoverHoverFocus(page) {
  return (
    <Popover id="popover-trigger-hover-focus" title="Document properties">
      <Table>
        <tbody>
          {page.properties.length ?
            page.properties.map(
              (prop, i) => <tr key={i}><td>{prop.name.value}</td><td>{prop.value.value}</td></tr>)
            : <tr><td>No FMD data</td></tr>}
          {page.oId && <tr><td>OID</td><td>{page.oId}</td></tr>}
          {page.absolutePath &&
            <tr><td>File name</td><td>{basename(page.absolutePath)}</td></tr>}
          {!page.absolutePath && page.path &&
            <tr><td>File name</td><td>{basename(page.path)}</td></tr>}
          {!page.absolutePath && !page.path && <tr><td>Unsaved file</td></tr>}
        </tbody>
      </Table>
    </Popover>
  );
}

export default class Tabs extends PureComponent {
  static propTypes = {
    pages: PropTypes.array.isRequired,
    focusedPageId: PropTypes.string,
    focusPage: PropTypes.func,
    addAndMount: PropTypes.func,
    removeAndUnmountPage: PropTypes.func,
  };

  handleSelect = (eventKey) => {
    if (eventKey === 'new') {
      return this.props.addAndMount();
    }

    this.props.focusPage(eventKey);
  }

  handleClose = (e, pageId) => {
    e.preventDefault();
    e.stopPropagation();
    this.props.removeAndUnmountPage(pageId);
    e.stopPropagation();
  }

  render() {
    logger.debug('render');
    const { pages, focusedPageId } = this.props;

    return (
      <Nav bsStyle="tabs" activeKey={focusedPageId} onSelect={this.handleSelect}>
        {pages.map(page =>
          <NavItem
            key={page.pageId}
            eventKey={page.pageId}
          >
            <div className={styles.title}>
              <OverlayTrigger overlay={popoverHoverFocus(page)}>
                <a>{page.isModified ? page.title.concat(' *') : page.title}</a>
              </OverlayTrigger>
              <Button
                bsStyle="link"
                onClick={e => this.handleClose(e, page.pageId)}
                className={styles.button}
              >
                <Glyphicon
                  glyph="remove-circle"
                  className="text-danger"
                />
              </Button>
            </div>
          </NavItem>
        )}
        <NavItem eventKey="new">
          New Page
          <Button bsStyle="link" className={styles.button}>
            <Glyphicon
              glyph="plus-sign"
              className="text-primary"
            />
          </Button>
        </NavItem>
      </Nav>
    );
  }
}
