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

  componentWillMount() {
    this.setState({ activeTab: this.props.currentDisplay });
  }

  onNavItemClick = (tabIndex) => {
    this.setState({ activeTab: tabIndex });
    this.props.changeCurrentDisplay(tabIndex);
  }

  render() {
    const { items, closeEditor } = this.props;
    const { activeTab } = this.state;
    return (
      <Nav
        className={styles.root}
        bsStyle="tabs"
        activeKey={activeTab}
        onSelect={this.onNavItemClick}
      >
        {items.map((item, index) => (
          <NavItem
            key={index}
            eventKey={index}
          >
            {item}
          </NavItem>
        ))}
        <NavItem className="pull-right" onClick={closeEditor}>
          <Glyphicon glyph="remove-circle" />
        </NavItem>
      </Nav>
    );
  }
}
