import React, { PropTypes } from 'react';
import { Nav, NavItem, Glyphicon } from 'react-bootstrap';
import styles from './Navbar.css';


export default class EditorNavbar extends React.Component {
  static propTypes = {
    currentDisplay: PropTypes.number,
    changeCurrentDisplay: PropTypes.func,
    items: PropTypes.array,
    closeEditor: PropTypes.func
  }
  constructor(...args) {
    super(...args);
    this.state = { activeTab: this.props.currentDisplay };
  }
  onNavItemClick(activeTab) {
    this.setState({ 'activeTab': activeTab });
    this.props.changeCurrentDisplay(activeTab);
  }
  render() {
    let items = this.props.items.map((item, index) => (
      <NavItem
        key={index}
        className={(this.state.activeTab === index) ?
          [styles.navItem, styles.itemActif] :
          styles.navItem
        }
        eventKey={item}
        onClick={() => this.onNavItemClick(index)}
      >
        {item}
      </NavItem>
    ));
    return (
      <Nav className={styles.navbar} bsStyle="tabs">
        {items}
        <NavItem className={[styles.navItem, styles.close]} onClick={this.props.closeEditor}>
          <Glyphicon glyph='remove-circle' />
        </NavItem>
      </Nav>
    );
  }
}
