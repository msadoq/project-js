// ====================================================================
// HISTORY
// VERSION : 1.1.0 : : : 28/02/2017 : Initial version
// VERSION : 1.1.2 : DM : #3622 : 13/03/2017 : Add WS_PAGE_CLOSE action + remove unmountAndRemove (page)
// VERSION : 1.1.2 : DM : #3622 : 13/03/2017 : Remove add/_add/addAndMount thunks . .
// VERSION : 1.1.2 : DM : #3622 : 13/03/2017 : TEMP - TO RESET . . .
// VERSION : 1.1.2 : DM : #5828 : 15/03/2017 : Remove add page button in page navigation tabs
// VERSION : 1.1.2 : DM : #5828 : 28/03/2017 : merge dev into work branch
// VERSION : 1.1.2 : DM : #5828 : 29/03/2017 : Move page items order in navbar
// VERSION : 1.1.2 : DM : #5828 : 30/03/2017 : Fix drop view, page and workspace
// VERSION : 1.1.2 : DM : #5828 : 19/04/2017 : Page title edition using contextMenu and GenericModal.
// VERSION : 1.1.2 : DM : #5828 : 26/04/2017 : Page title edition is accessible through the upper menu.
// VERSION : 1.1.2 : DM : #5828 : 05/05/2017 : General Editor Refacto : using GenericModal, using rc-collapse module instead of bootstrap accordion.
// VERSION : 1.1.2 : DM : #5828 : 10/05/2017 : General Editor Refacto : using GenericModal, using rc-collapse module instead of bootstrap accordion.
// VERSION : 1.1.2 : DM : #5828 : 12/05/2017 : when DUMP parameter is on, add message in console and color on window nav
// VERSION : 1.1.2 : DM : #5828 : 14/06/2017 : Move common/log and common/parameters in client/
// VERSION : 1.1.2 : FA : ISIS-FT-2132 : 15/06/2017 : Ask to save before closing view or page
// VERSION : 1.1.2 : FA : ISIS-FT-2132 : 20/06/2017 : Fix asking to save before closing view or page
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 06/07/2017 : Rewrite all saving page code
// VERSION : 1.1.2 : FA : #7256 : 20/07/2017 : Working on cleaning style, added variables to edit style easily.
// VERSION : 1.1.2 : DM : #6700 : 03/08/2017 : Merge branch 'dev' into dbrugne-data
// END-HISTORY
// ====================================================================

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { basename } from 'path';
import classnames from 'classnames';
import { Nav, NavItem, Button, Glyphicon, OverlayTrigger, Table, Popover } from 'react-bootstrap';
import _ from 'lodash';
import { get } from 'common/configurationManager';
import styles from './Tabs.css';
import {
  COLOR_ISIS_SAT, COLOR_MULTIPLE_SAT, COLOR_SIMUPUS_SAT, DOMAIN_ISIS,
  DOMAIN_SIMUPUS,
} from '../../constants';

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

const { string, func, object, arrayOf } = PropTypes;

export default class Tabs extends PureComponent {
  static propTypes = {
    // from container mapStateToProps
    pages: arrayOf(object).isRequired,
    windowId: PropTypes.string,
    detachWindow: PropTypes.bool,
    attachWindow: string,
    // from container mapDispatchToProps
    askClosePage: func.isRequired,
    movePageToWindow: func.isRequired,
    focusedPageId: string,
    moveTabOrder: func.isRequired,
    focusPage: func.isRequired,
    pageDragEvent: func.isRequired,
  };

  handleSelect = (eventKey) => {
    if (eventKey) {
      this.props.focusPage(eventKey);
    }
  };

  handleMoveOut = (e, pageId) => {
    e.stopPropagation();
    this.props.movePageToWindow(pageId);
  };

  handleClose = (e, pageId) => {
    e.stopPropagation();
    this.props.askClosePage(pageId);
  };

  handleDragStart = (ev, pageId, key) => {
    this.props.pageDragEvent(true, this.props.windowId);
    this.setState({ dragging: pageId });
    ev.dataTransfer.setData('pageId', pageId);
    ev.dataTransfer.setData('position', key);
  };

  handleDragStop = (e, pageId) => {
    e.stopPropagation();
    if (this.props.windowId !== this.props.attachWindow) {
      this.props.movePageToWindow(pageId, this.props.attachWindow);
    } else if (this.props.detachWindow) {
      this.props.movePageToWindow(pageId);
    }
    this.setState({ dragging: null });
  };

  handleDragOver = (e) => {
    e.preventDefault();
    const ev = e.currentTarget.parentNode;
    this.props.pageDragEvent(false, this.props.windowId);
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
  };

  handleDragLeave = (e) => {
    const ev = e.currentTarget.parentNode;
    this.props.pageDragEvent(true, this.props.windowId);
    ev.style.borderLeft = 'none';
    ev.style.borderRight = 'none';
  };

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
  };

  render() {
    const { pages, focusedPageId } = this.props;
    return (
      <Nav
        bsStyle="tabs"
        activeKey={focusedPageId}
        onSelect={this.handleSelect}
        className={classnames(
          'MainNav',
          { [styles.band]: get('DUMP') === 'on' }
        )}
      >
        {
          pages.map((page, key) => {
            // get the style for tabs
            // color of tabs depends on domains of each view contained in the page
            const { configurations } = page;
            const domains = _.pull(_.uniqBy(
              [].concat(
                [],
                ...configurations.map(configuration =>
                  configuration.entryPoints.map(
                    entryPoint => entryPoint.connectedData.domain
                  )
                )
              )
            ), '*');

            const colors = get('DOMAINS_COLORS');
            const domain = domains.length > 1 ? 'multi' : domains[0];
            const colorObject = colors.find(obj => Object.keys(obj)[0] === domain);
            const borderColorForTab = colorObject !== undefined ? colorObject[domain] : null;

            const style = {
              borderBottom: '8px solid',
              borderColor: borderColorForTab,
            };
            // end of get the style for tabs
            return (
              <NavItem
                key={page.pageId}
                eventKey={page.pageId}
                onDragOver={this.handleDragOver}
                onDragLeave={this.handleDragLeave}
                onDrop={(e) => { this.handleDrop(e, page.title, key); }}
                style={style}
              >
                <div
                  draggable
                  onDragStart={(e) => { this.handleDragStart(e, page.title, key); }}
                  onDragEnd={(e) => { this.handleDragStop(e, page.pageId); }}
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
            );
          })
        }
      </Nav>
    );
  }
}
