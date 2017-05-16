import React, { PureComponent, PropTypes } from 'react';
import { basename } from 'path';
import { Nav, NavItem, Button, Glyphicon, OverlayTrigger, Table, Popover } from 'react-bootstrap';
import { get } from 'common/parameters';
import DummyDrag from './DummyDrag';
import styles from './Tabs.css';

const popoverDraggingStyle = { display: 'none' };

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
    focusPage: PropTypes.func.isRequired,
    closePage: PropTypes.func.isRequired,
    moveTabOrder: PropTypes.func.isRequired,
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

  handleDragStart = (ev, pageId, key) => {
    // console.log('start');
    this.setState({ dragging: pageId });
    ev.dataTransfer.setData('pageId', pageId);
    ev.dataTransfer.setData('position', key);
  }

  handleDragStop = () => {
    this.setState({ dragging: null });
  //  console.log(e.clientX);
  }

  handleDragOver = (e) => {
    e.preventDefault();
    const ev = e.currentTarget.parentNode;
    if (ev.tagName.toLowerCase() === 'li') {
      ev.style.borderLeft = 'none';
      ev.style.borderRight = 'none';
      if (
        e.clientX - ev.getBoundingClientRect().left >
        ev.getBoundingClientRect().width / 2
      ) {
        ev.style.borderRight = '2px solid rgb(51,122,183)';
      } else {
        ev.style.borderLeft = '2px solid rgb(51,122,183)';
      }
    }
  }

  handleDragLeave = (e) => {
    const ev = e.currentTarget.parentNode;
    ev.style.borderLeft = 'none';
    ev.style.borderRight = 'none';
  }

  handleDrop = (e, pageId, key) => {
    const ev = e.currentTarget.parentNode;
    ev.style.borderLeft = 'none';
    ev.style.borderRight = 'none';
    let newKey = key;
    if (
      e.clientX - ev.getBoundingClientRect().left >
      ev.getBoundingClientRect().width / 2
    ) {
      newKey = key + 1;
    }
    this.props.moveTabOrder(parseInt(e.dataTransfer.getData('position'), 10), newKey);
  }

  render() {
    const { pages, focusedPageId } = this.props;
    let dumpColor = '';
    if (get('DUMP') === 'on') {
      dumpColor = styles.band;
    }

    return (
      <Nav bsStyle="tabs" activeKey={focusedPageId} onSelect={this.handleSelect} className={dumpColor}>
        {
          pages.map((page, key) =>
            <NavItem
              key={page.pageId}
              eventKey={page.pageId}
              onDragOver={this.handleDragOver}
              onDragLeave={this.handleDragLeave}
              onDrop={(e) => { this.handleDrop(e, page.title, key); }}
            >
              <div
                draggable
                onDragStart={(e) => { this.handleDragStart(e, page.title, key); }}
                onDragEnd={this.handleDragStop}
                onDrag={this.handleDrag}
              >
                <OverlayTrigger
                  className={styles.title}
                  overlay={
                    this.state &&
                    this.state.dragging ?
                      popoverHoverDragging(page, this.state.dragging) :
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
          )
        }
        <DummyDrag />
      </Nav>
    );
  }
}
