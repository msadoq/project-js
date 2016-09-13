import React from 'react';
import { SketchPicker } from 'react-color';

/*
  Ce composant affiche un bouton de couleur.
  onClick : une palette de couleur apparait et permet de selectionner une couleur.
  un objet color est renvoyé en parametre de la fonction handleChangeComplete.

  Composant react-color :
  https://github.com/casesandberg/react-color/

*/
export default class ColorPicker extends React.Component {
  static propTypes = {
    color: React.PropTypes.string,
    onChange: React.PropTypes.func
  }
  constructor(...args) {
    super(...args);
    this.state = {
      display: false,
      color: this.props.color === undefined ? '#FFF' : this.props.color
    };
  }
  /*
    Affiche et cache la palette de couleurs lors du click sur le bouton.
    Parametre e : evenement récupéré.
  */
  handleClick = (e) => {
    e.preventDefault();
    this.setState({ display: !this.state.display });
  }
  /*
    Cache la palette.
  */
  handleClose = () => {
    this.setState({ display: false });
  }
  /*
    Lorsqu'une couleur est selectionnée, cette fonction est appelée.
    Parametre color : un objet color correspondant à la couleur selectionnée
  */
  handleChangeComplete = (color) => {
    this.props.onChange('colour', color.hex);
    this.setState({ color: color.hex });
  }
  render() {
    const popover = {
      position: 'absolute',
      zIndex: '3'
    };
    const cover = {
      position: 'fixed',
      top: '0',
      right: '0',
      bottom: '0',
      left: '0',
    };
    return (
      <div>
        <button
          style={{
            backgroundColor: this.state.color,
            borderColor: '#333',
            borderWidth: '1px',
            height: '16px',
            width: '32px'
          }}
          onClick={this.handleClick}
        >
        </button>
        {this.state.display ?
          <div style={popover}>
            <div
              style={cover}
              onClick={this.handleClose}
            />
            <SketchPicker
              onChange={this.handleChangeComplete}
              color={this.props.color === undefined ? '#FFF' : this.props.color}
            />
          </div> : null
        }
      </div>
    );
  }
}
