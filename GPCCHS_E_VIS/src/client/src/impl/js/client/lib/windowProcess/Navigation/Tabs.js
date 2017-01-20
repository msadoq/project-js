import React, { Component, PropTypes } from 'react';
import { Nav, NavItem, Button, Glyphicon, Popover, OverlayTrigger, Table } from 'react-bootstrap';
import getLogger from 'common/log';
import styles from './Tabs.css';

const logger = getLogger('Tabs');

function popoverHoverFocus(page) {
  // TODO to be completed with document information
  return (
    <Popover id="popover-trigger-hover-focus" title="Document properties">
      <Table>
        <tbody>
          <tr><td>Version</td><td>Unknown</td></tr>
          {page.oId
            ? <tr>
              <td>OId</td>
              <td>{page.oId}</td>
            </tr>
            : <tr>
              <td>Path</td>
              <td>{page.path}</td>
            </tr>
          }
        </tbody>
      </Table>
    </Popover>
  );
}

export default class Tabs extends Component {
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
          <OverlayTrigger
            trigger={['hover', 'focus']}
            placement="bottom"
            overlay={popoverHoverFocus(page)}
            key={page.pageId}
          >
            <NavItem
              key={page.pageId}
              eventKey={page.pageId}
            >
              <div className={styles.title}>
                {page.isModified ? page.title.concat(' *') : page.title}
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
          </OverlayTrigger>
        )}
        <NavItem eventKey="new">
          New page
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
