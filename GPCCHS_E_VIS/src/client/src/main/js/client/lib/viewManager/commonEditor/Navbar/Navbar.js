// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #3622 : 09/03/2017 : Moving the editor files in viewManager, splitting
//  between commonEditor and commonReduxForm.
// VERSION : 1.1.2 : DM : #5828 : 28/04/2017 : No vertical bar when editor minimized.
// VERSION : 2.0.0.3 : FA : ISIS-FT-3086 : 15/05/2018 : editor's form bug on reintialize
// VERSION : 2.0.0.3 : FA : ISIS-FT-3086 : 30/05/2018 : editor's form bug on reintialize
// END-HISTORY
// ====================================================================

import React, { PropTypes } from 'react';
import { Nav, NavItem } from 'react-bootstrap';
import styles from './style.css';

export default class Navbar extends React.Component {

  static propTypes = {
    currentDisplay: PropTypes.number.isRequired,
    changeCurrentDisplay: PropTypes.func.isRequired,
    items: PropTypes.arrayOf(PropTypes.string).isRequired,
  }

  componentWillMount() {
    this.setState({ activeTab: this.props.currentDisplay });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ activeTab: nextProps.currentDisplay });
  }

  onNavItemClick = (tabIndex) => {
    this.setState({ activeTab: tabIndex });
    this.props.changeCurrentDisplay(tabIndex);
  }

  render() {
    const { items } = this.props;
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
            key={item}
            eventKey={index}
          >
            {item}
          </NavItem>
        ))}
      </Nav>
    );
  }
}
