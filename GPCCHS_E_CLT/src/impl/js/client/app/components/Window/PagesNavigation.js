import React, { Component, PropTypes } from 'react';
import { Nav, NavItem, Glyphicon } from 'react-bootstrap';
import styles from './PagesNavigation.css';

export default class PagesNavigation extends Component {
  static propTypes = {
    pageId: PropTypes.string,
    title: PropTypes.string,
    focusedTab: PropTypes.string,
    pages: PropTypes.array.isRequired,
    addPage: PropTypes.func.isRequired,
    delPage: PropTypes.func.isRequired,
    mountPage: PropTypes.func.isRequired,
    unmountPage: PropTypes.func.isRequired,
    focusPage: PropTypes.func.isRequired,
  };
  constructor(...args) {
    super(...args);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }
  handleSelect(eventKey) {
    if (eventKey === 'new') {
      const id = `${Math.random()}`;
      this.props.addPage(id, 'New page title');
      return this.props.mountPage(id);
    }

    this.props.focusPage(eventKey);
  }
  handleClose(e, pageId) {
    e.preventDefault();
    this.props.delPage(pageId);
    this.props.unmountPage(pageId);
  }
  render() {
    const { pages } = this.props;

    let focusedTab = this.props.focusedTab;
    if (!focusedTab && pages.length > 0) {
      focusedTab = pages[0].pageId;
    }

    return (
      <Nav bsStyle="tabs" activeKey={focusedTab} onSelect={this.handleSelect}>
        {pages.map(page =>
          <NavItem
            key={`page${page.pageId}`}
            eventKey={page.pageId}
          >
            <div className={styles.title}>
              {page.title}
            </div>
            <div onClick={e => this.handleClose(e, page.pageId)} className={styles['close-button']}>
              <Glyphicon glyph="remove-circle" />
            </div>
          </NavItem>
        )}
        <NavItem eventKey="new">New page +</NavItem>
      </Nav>
    );
  }
}
