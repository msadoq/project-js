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
      color: null
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
    this.setState({
      display: false,
      color: null
    });
  }
  /*
    Lorsqu'une couleur est selectionnée, cette fonction est appelée.
    Parametre color : un objet color correspondant à la couleur selectionnée
  */
  handleChangeComplete = (color) => {
    this.props.onChange(color.hex);
    this.setState({ color: color.hex });
  }
  render() {
    const color = this.state.color || this.props.color || '#FFF';

    return (
      <div>
        <button
          style={{
            backgroundColor: color,
            borderColor: '#333',
            borderWidth: '1px',
            height: '16px',
            width: '32px'
          }}
          onClick={this.handleClick}
        />
        {this.state.display ?
          <div
            style={{
              position: 'absolute',
              zIndex: '3'
            }}
          >
            <SketchPicker
              onChange={this.handleChangeComplete}
              color={color}
            />
          </div> : null
        }
      </div>
    );
  }
}
