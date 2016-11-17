import React, { PropTypes } from 'react';
import { Glyphicon, FormGroup, InputGroup, FormControl, Button, Col } from 'react-bootstrap';
import classnames from 'classnames';
import styles from './EntryPointActions.css';

const { Addon } = InputGroup;

/*
  EntryPointActions représente la barre des actions qui peuvent être effectuées sur les entryPoints.
    - Une barre de recherche pour filtrer les entryPoint en fonction de leurs nom.
    - Un bouton qui permet d'ajouter un entryPoint avec les attributs par defaut.
    - Un bouton qui permet de détacher un entryPoint.
*/
export default class EntryPointActions extends React.Component {
  static propTypes = {
    /*
      changeSearch prend en parametre le filtre (chaine de caractères) à appliquer.
    */
    changeSearch: PropTypes.func,
    addEntryPoint: PropTypes.func
  }

  /*
    Fonction appelée lorsque la valeur du filtre de recherche est modifiée.
    Parametre e : évenement detecté (click)
  */
  searchName = e => this.props.changeSearch(e.target.value);
  /*
    Fonction appelée lorsque le bouton d'ajout d'entryPoint est cliqué.
    @TODO : Ajouter un entryPoint par défaut au composant racine
            qui contient dans ses states la liste des entryPoints
            Cela necessite d'ajouter une fonction de callback aux props de ce composant
  */
  addEntryPoint = () => this.props.addEntryPoint();

  render() {
    return (
      <div
        className="row"
        style={{ backgroundColor: 'white', margin: '10px', borderRadius: '5px' }}
      >
        <FormGroup bsSize="small" style={{ display: 'inline' }}>
          <Col xs={8} className={styles.noPadding}>
            <InputGroup>
              <FormControl type="text" onChange={this.searchName} />
              <Addon>
                <Glyphicon glyph="search" />
              </Addon>
            </InputGroup>
          </Col>
          <Col xs={4} className={classnames(styles.noPadding, 'text-right')}>
            <Button bsSize="small" onClick={this.addEntryPoint}>
              <Glyphicon glyph="plus" />
            </Button>
            <Button bsSize="small" style={{ marginLeft: '6px' }}>
              <Glyphicon glyph="link" />
            </Button>
          </Col>
        </FormGroup>
      </div>
    );
  }
}
