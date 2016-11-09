import React, { PropTypes } from 'react';
import { Nav, NavItem, Glyphicon } from 'react-bootstrap';
import styles from './Navbar.css';

/*
  Barre de Navigation qui permet de changer d'onglet et de fermer l'éditeur.
*/

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
  /*
    Fonction appelée lorsqu'un item a recu un évenement click.
    Param tab : onglet à afficher.
  */
  onNavItemClick(tab) {
    this.setState({ activeTab: tab });
    this.props.changeCurrentDisplay(tab);
  }

  render() {
    const { items, closeEditor } = this.props;
    const { activeTab } = this.state;

    return (
      <Nav className={styles.navbar} bsStyle="tabs">
        {items.map((item, index) => (
          <NavItem
            key={index}
            className={(activeTab === index) ?
              [styles.navItem, styles.itemActif] :
              styles.navItem
            }
            eventKey={item}
            onClick={() => this.onNavItemClick(index)}
          >
            {item}
          </NavItem>
        ))}
        <NavItem className={[styles.navItem, styles.close]} onClick={closeEditor}>
          <Glyphicon glyph="remove-circle" />
        </NavItem>
      </Nav>
    );
  }
}
