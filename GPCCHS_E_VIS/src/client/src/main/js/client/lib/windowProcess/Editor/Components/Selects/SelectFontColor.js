import React, { PropTypes } from 'react';


/*
  A SUPPRIMER
*/

export default class SelectFontFamilySize extends React.Component {
  static propTypes = {
    curveColor: PropTypes.string,
  }
  static defaultProps = {
    curveColor: '#000000',
  };

  componentWillMount() {
    this.setState({
      curveColor: this.props.curveColor,
    });
  }

  render() {
    return (
      <div>to do</div>
    );
  }
}
