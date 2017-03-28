import React, { PureComponent, PropTypes } from 'react';
import { basename } from 'path';
import { Nav, NavItem, Button, Glyphicon, OverlayTrigger, Table, Popover } from 'react-bootstrap';
<<<<<<< HEAD
=======
import getLogger from 'common/log';

>>>>>>> dev
import styles from './Tabs.css';

const popoverDraggingStyle = { display: 'none' };
const menuItemsDraggingStyle = { borderRight: '2px solid red', borderLeft: '2px solid red' };
function popoverHoverFocus(page) {
  return (
    <Popover id={page.pageId} title="Document properties">
      <Table>
        <tbody>
          {page.properties.length ?
            page.properties.map(
              (prop, idx) => <tr key={page.pageId.concat(idx)}>
                <td>{prop.name.value}</td>
                <td>{prop.value.value}</td>
              </tr>)
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
function popoverHoverDragging(page) {
  return (
    <Popover id={page.pageId} style={popoverDraggingStyle} />
  );
}

export default class Tabs extends PureComponent {
  static propTypes = {
    pages: PropTypes.arrayOf(PropTypes.object).isRequired,
    focusedPageId: PropTypes.string,
    focusPage: PropTypes.func,
    closePage: PropTypes.func,
  };

  handleSelect = (eventKey) => {
    if (eventKey) {
      this.props.focusPage(eventKey);
    }
  }

  handleClose = (e, pageId) => {
    e.preventDefault();
    e.stopPropagation();
    this.props.closePage(pageId);
    e.stopPropagation();
  }

  handleDragStart = (pageId) => {
    this.setState({ dragging: pageId });
  }

  handleDragStop = () => {
    this.setState({ dragging: null });
  }

  handleDrag = (e) => {
    e.stopPropagation();
    e.preventDefault();
  }

  render() {
    const { pages, focusedPageId } = this.props;

    return (
      <Nav bsStyle="tabs" activeKey={focusedPageId} onSelect={this.handleSelect}>
        {pages.map(page =>
          <NavItem
            key={page.pageId}
            eventKey={page.pageId}
            style={
              this.state &&
              this.state.dragging ?
                menuItemsDraggingStyle :
                null
            }
          >
            <div
              draggable
              onDragStart={() => { this.handleDragStart(page.pageId); }}
              onDragEnd={this.handleDragStop}
              onDrag={this.handleDrag}
            >
              <OverlayTrigger
                className={styles.title}
                overlay={
                  this.state &&
                  this.state.dragging === page.pageId ?
                    popoverHoverDragging(page) :
                    popoverHoverFocus(page)
                }
              >
                <div>
                  <span>{page.isModified ? page.title.concat(' *') : page.title}</span>
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
              </OverlayTrigger>
            </div>
          </NavItem>
        )}
      </Nav>
    );
  }
}
