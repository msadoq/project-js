import React, { Component, PropTypes } from 'react';
import { Nav, NavItem, Glyphicon } from 'react-bootstrap';
import styles from './Tabs.css';

export default class Tabs extends Component {
  static propTypes = {
    pages: PropTypes.array.isRequired,
    focusedPage: PropTypes.string,
    focusPage: PropTypes.func,
    addAndMount: PropTypes.func,
    removeAndUnmountPage: PropTypes.func,
  };
  constructor(...args) {
    super(...args);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }
  handleSelect(eventKey) {
    if (eventKey === 'new') {
      return this.props.addAndMount();
    }

    this.props.focusPage(eventKey);
  }
  handleClose(e, pageId) {
    e.preventDefault();
    this.props.removeAndUnmountPage(pageId);
  }
  render() {
    const { pages, focusedPage } = this.props;

    return (
      <Nav bsStyle="tabs" activeKey={focusedPage} onSelect={this.handleSelect}>
        {pages.map(page =>
          <NavItem
            key={page.pageId}
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
