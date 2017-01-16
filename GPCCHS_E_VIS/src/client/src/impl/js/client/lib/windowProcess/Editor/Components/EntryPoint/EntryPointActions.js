import React, { PropTypes } from 'react';
import { Glyphicon, FormGroup, InputGroup, FormControl, Button, Col } from 'react-bootstrap';
import Modal from '../../../common/Modal';
import {
  EntryPointName
} from './';

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

  state = {
    isCreationModalOpened: false,
  };

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
  openCreationModal = () => this.setState({ isCreationModalOpened: true });
  closeCreationModal = () => this.setState({ isCreationModalOpened: false });

  handleAddEntryPoint = (values) => {
    this.props.addEntryPoint(values);
    this.closeCreationModal();
  }

  render() {
    const {
      isCreationModalOpened,
    } = this.state;

    return (
      <div>
        <FormGroup
          bsSize="sm"
          className="row"
        >
          <Col xs={8}>
            <InputGroup>
              <FormControl
                type="text"
                onChange={this.searchName}
              />
              <Addon>
                <Glyphicon glyph="search" />
              </Addon>
            </InputGroup>
          </Col>
          <Col xs={4} className="text-right">
            <Button
              bsSize="small"
              onClick={this.openCreationModal}
              title="Add entry point"
            >
              <Glyphicon glyph="plus" />
            </Button>
            <Button bsSize="small" style={{ marginLeft: '6px' }}>
              <Glyphicon glyph="link" />
            </Button>
          </Col>
        </FormGroup>
        <Modal
          title="Add a new Entry point"
          isOpened={isCreationModalOpened}
          onClose={this.closeCreationModal}
        >
          <EntryPointName
            onSubmit={this.handleAddEntryPoint}
            form="new-entrypoint-parameters-form"
          />
        </Modal>
      </div>
    );
  }
}
